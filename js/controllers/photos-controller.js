angular.module("alexpic").controller("PhotosController", function($scope, photoResource) {
	$scope.photos = [];
	$scope.filter = "";

	// getting the photos
	photoResource.query({"action":"photos"}, function successCallback(photos) {
		$scope.photos = photos;
	
	}, function errorCallback(data, status) {
		console.log(data);
	});

	/*$http.get("api/photos.php?action=photos").success(function successCallback(data) {
		$scope.photos = data;
	
	}).error(function errorCallback(data, status) {
		console.log(data);
	});*/

	$scope.deletePhoto = function(photo) {
		photoResource.delete({"action":"delete", "id":photo._id}, function() {
			var index = $scope.photos.indexOf(photo);
			$scope.photos.splice(index, 1);
			
		}, function(data, status) {
			console.log(data);
		});
		/*$http.post("api/photos.php?action=delete", {"id":photo._id}).success(function(data) {
			var index = $scope.photos.indexOf(photo);
			$scope.photos.splice(index, 1);

		}).error(function(data, status) {
			console.log(data);
		});*/
	}

});