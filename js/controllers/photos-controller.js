angular.module("alexpic").controller("PhotosController", function($scope, photoResource) {
	$scope.photos = [];
	$scope.filter = "";
	
	// getting the photos
	photoResource.query(function successCallback(photos) {
		$scope.photos = photos;
	
	}, function errorCallback(data, status) {
		console.log(data);
	});

	// deleting a photo
	$scope.deletePhoto = function(photo) {
		photoResource.delete({"id":photo._id}, function() {
			var index = $scope.photos.indexOf(photo);
			$scope.photos.splice(index, 1);
			
		}, function(data, status) {
			console.log(data);
		});
	}

});