angular.module("alexpic").controller("PhotoController", function($scope, $mdToast, $routeParams, photoResource, photoSavior) {
	/* to avoid always to send an action, you may use http methods
		GET to get the images
		PUT to insert a new image
		DELETE to delete a image
		POST to edit a image
	*/

	$scope.photo = {};
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) { // Hey! How can I access this?
			photoSavior.save($scope.photo).then(function(response) {
				$scope.showMessage(response.message);
				if (response.inclusion) {
					$scope.photo = {};
				};
			})
			.catch (function(response) {
				$scope.showMessage(response.message);
			});
		};
	};

	if ($routeParams.id) {
		photoResource.get({"id":$routeParams.id}, function(photo) {
			$scope.photo = photo;

		}, function(data, status) {
			console.log(data);
		});
		/*$http.post("api/photos.php?action=get", {'id':$routeParams.id}).success(function(data) {
			$scope.photo = data;
	
		}).error(function(data, status) {
			console.log(data);
		});*/
	}

	$scope.showMessage = function(message) {
		var toast = $mdToast.simple(message)
			.action('OK')
			.highlightAction(true)
			.hideDelay(3500) // default 3000
			.position("top right")
			.parent("#alert-toast");
		
		$mdToast.show(toast);
	};
});