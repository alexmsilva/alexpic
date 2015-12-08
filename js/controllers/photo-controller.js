angular.module("alexpic").controller("PhotoController", function($scope) {
	$scope.photo = {};
	$scope.message = "";
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) { // Hey! How can I acces this?
			console.log($scope.photo);
			$scope.photo = {};
		};
	};
});