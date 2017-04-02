angular.module('MyApp').service('AuthService', function($q,$http,$rootScope,$state) {
	console.log("AuthService");
}).service('UtilityService', function($q,$rootScope,$state,$http) {
	var CACHE = 'search_cache';
	var enlarged = {};
	var res=window.localStorage.getItem(CACHE);
	if(res){
		res=JSON.parse(res);
		console.log(res)
	}else{
		res=[];
	}
	var pagesize=12;
	function apiCall(q,pageno){
		return $q(function(resolve, reject) {
			var url="https://api.spotify.com/v1/search?q="+q+"&type=album,artist&offset="+pageno+"&limit="+pagesize;
			url=encodeURI(url);
			$http.get(url).success(function(response) {
				resolve(response);
				
			  
			},function(err){
			  console.log(err);
			  reject(err);
			});
		})
	}
	
	function search(q,page){
		var pageno=page*pagesize;
		
		
		return $q(function(resolve, reject) {
			var ind=getQueryIndex(q);
			if(ind==-1){
				apiCall(q,pageno).then(function(data){
					ind=storeNew(data,q,page);
					resolve(res[ind].arr[page]);
				},function(err){
					form.loading=false;
					reject(err);
				})
				
			}else if((page)==(res[ind].arr.length)){
				//get a new page
				console.log("Getting a new page");
				apiCall(q,pageno).then(function(data){
					ind=pushNew(data,q,page,ind);
					resolve(res[ind].arr[page]);
				},function(err){
					form.loading=false;
					reject(err);
				})
				 
			}else
				resolve(res[ind].arr[page]);
			
			
		});
		
	}
	function getQueryIndex(q){
		var ind=-1;
		for(var i=0;i<res.length;i++){
			if(res[i].q==q){
				ind=i;
				break;
			}
		}
		console.log(ind);
		return ind;
	}
	function storeNew(ar,q,page){
		res.push({
			q:q,
			arr:[ar]
		});
		window.localStorage.setItem(CACHE, JSON.stringify(res));
		return res.length-1
	}
	function pushNew(ar,q,page,ind){
		res[ind].arr[page]=ar;
		window.localStorage.setItem(CACHE, JSON.stringify(res));
		return res.length-1
	}
    return {
		search : search,
		setEnlarged:function(s){enlarged=s},
		getEnlarged:function(){return enlarged;}
	}

});