angular.module('MyApp').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");  
	$stateProvider
	.state('landing', {
		url: "/",
		templateUrl: "views/landing.html",            
		data: {pageTitle: 'Account',requiresLogin:true},
		controller: "LandingController"
	})
}]);