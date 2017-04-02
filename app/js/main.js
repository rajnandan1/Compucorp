
var MyApp = angular.module("MyApp", [
    "ui.router", 
    "ngSanitize",
    "ngResource",
	'vModal',
	'ngAudio'
]);

MyApp.controller('AppController', ['$scope', '$rootScope','AuthService','$state', function($scope, $rootScope,AuthService,$state) {
    $scope.$on('$viewContentLoaded', function() {
    });
}]);

MyApp.run(["$rootScope", "$state","AuthService", function($rootScope, $state,AuthService) {
     
}]);