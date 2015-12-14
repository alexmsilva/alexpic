angular.module("alexpic").controller("PhotosController", function($scope, $http) {
	$scope.photos = [];
	$scope.filter = "";
	
	// getting the photos
	$http.get("api/photos.php?action=photos").success(function successCallback(data) {
		$scope.photos = data;
	
	}).error(function errorCallback(data, status) {
		console.log(data);
	});

	// deleting a photo
	$scope.deletePhoto = function(photo) {
		$http.post("api/photos.php?action=delete", {"id":photo._id}).success(function(data) {
			var index = $scope.photos.indexOf(photo);
			$scope.photos.splice(index, 1);
				
		}).error(function(data, status) {
			console.log(data);
		});
	}

});