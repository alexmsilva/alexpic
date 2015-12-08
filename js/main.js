angular.module("alexpic", ['ngMaterial','customDirectives','ngRoute'])
.config(function($routeProvider, $locationProvider) {
	
	$locationProvider.html5Mode(true);

	$routeProvider.when("/photos", {
		templateUrl : "partials/photos.html",
		controller : "PhotosController"
	});

	$routeProvider.when("/photos/new", {
		templateUrl : "partials/edit-photo.html"
	});

	$routeProvider.otherwise({redirectTo : "/photos"});
});