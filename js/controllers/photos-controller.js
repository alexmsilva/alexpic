angular.module("alexpic").controller("PhotosController", function($scope, $http) {
	$scope.photos = [];
	$http.get("api/calls.php?action=photos").success(function successCallback(data) {
		$scope.photos = data;
	
	}).error(function errorCallback(data, status) {
		console.log(response);
	});
});