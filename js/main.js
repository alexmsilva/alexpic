angular.module("alexpic", ['ngMaterial','customDirectives','ngRoute','ngMessages','aServices'])
.config(function($routeProvider, $locationProvider) {
	
	$locationProvider.html5Mode(true);

	$routeProvider.when("/photos", {
		templateUrl : "partials/photos.html",
		controller : "PhotosController"
	});

	$routeProvider.when("/photos/new", {
		templateUrl : "partials/edit-photo.html",
		controller : "PhotoController"
	});

	$routeProvider.when("/photos/edit/:id", {
		templateUrl : "partials/edit-photo.html",
		controller : "PhotoController"
	});

	$routeProvider.otherwise({redirectTo : "/photos"});
});