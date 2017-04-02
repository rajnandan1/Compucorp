angular.module('MyApp').controller('LandingController', ['$rootScope', '$scope','UtilityService','myModal', function($rootScope, $scope,UtilityService,myModal) {
    console.log("LandingController");
	particlesJS.load('particles-js', 'resources/particlesjs.json', function() {
		  console.log('callback - particles.js config loaded');
		});
	$scope.form={
		loading:false,
		q:'',
		cq:'',
		initial:true,
		hasZeroArtist:false,
		hasZeroAlbum:false,
		pageno:0,
		artists:[],
		albums:[],
		display:[],
		sel:"artists",
		search:function(){
			var form=this;
			if(form.loading) return;
			if(form.q=='') return;
			console.log("Searching - "+form.q);
			if(form.cq!=form.q){
				form.cq=form.q;
				form.display=[];
				form.albums=[];form.sel="artists";
				form.artists=[];
				form.pageno=0;form.hasZeroArtist=false;form.hasZeroAlbum=false;
			}
			form.loading=true;
			form.initial=false;
			UtilityService.search(form.cq,form.pageno).then(function(data){
				form.loading=false;
				if(data.albums.items.length==0) form.hasZeroAlbum=true;
				else form.albums.push.apply(form.albums, data.albums.items);
				if(data.artists.items.length==0) form.hasZeroArtist=true;
				else form.artists.push.apply(form.artists, data.artists.items);
				form.pageno++;
				form.change(form.sel);
			},function(err){
				form.loading=false;
			})
		},
		change:function(type){
			this.sel=type;
			if(type=='artists')this.display=this.artists; else this.display=this.albums;
			console.log(this.display);
		}
	}
	$scope.enlarge=function(item){
		UtilityService.setEnlarged(item);
		myModal.activate();
	}
}]).factory('myModal', function (vModal) {
  return vModal({
    controller: 'MyModalController',
    controllerAs: 'myModalCtrl',
    templateUrl: 'tpl/modal.html'
  });
}).controller('MyModalController', function ($scope,myModal,UtilityService,$http,ngAudio) {
	this.close = myModal.deactivate;
	
	
	
	function loadItem(){
		console.log((UtilityService.getEnlarged()));
		var item=UtilityService.getEnlarged();
		if(item.type=='artist'){
			$scope.modal={
				bg:item.images[0]===undefined?'https://upload.wikimedia.org/wikipedia/en/1/1d/Caustic_Window_LP_cover.jpg':item.images[0].url,
				name:item.name,
				gens:item.genres,
				type:item.type,
				followers:item.followers.total,
				popularity:item.popularity,
				id:item.id,
				albums:[],
				getAlbums:function(){
					var item=this;
					$http.get("https://api.spotify.com/v1/artists/"+item.id+"/albums").success(function(response) {
					  item.albums=response.items;
					  console.log(response);
					},function(err){
					  console.log(err);
					});
					
				}
			}
			$scope.modal.getAlbums();
		}else{
			$scope.modal={
				bg:item.images[0]===undefined?'https://upload.wikimedia.org/wikipedia/en/1/1d/Caustic_Window_LP_cover.jpg':item.images[0].url,
				name:item.name,
				gens:item.genres,
				type:item.type,
				id:item.id,
				artists:item.artists,
				atype:item.album_type,
				tracks:[],
				getTracks:function(){
					var item=this;
					$http.get("https://api.spotify.com/v1/albums/"+item.id+"/tracks").success(function(response) {
					  item.tracks=response.items;
					  console.log(response);
					},function(err){
					  console.log(err);
					});
					
				}
			}
			$scope.modal.getTracks();
		}
	}
	$scope.loadNew=function(item){
		console.log(item);
		item.fetch=true;
		$http.get(item.href).success(function(response) {
			item.fetch=false;
		  UtilityService.setEnlarged(response)
		  console.log(response);
		  loadItem();
		},function(err){
		  console.log(err);item.fetch=false;
		});
	}
	var sound=null;
	$scope.playPreview=function(item){
		for(var i=0;i<$scope.modal.tracks.length;i++) $scope.modal.tracks[i].fetch=false;
		if(sound!=null) sound.stop();
		item.fetch=true;
		sound = ngAudio.load(item.preview_url);
		sound.play();
	}
	loadItem();
});