angular.module("alexpic").controller("PhotoController", function($scope, $mdToast, $routeParams, photoResource, photoSavior) {

	$scope.photo = {};

	// load a photo when there's a id passed by param
	if ($routeParams.id) {
		photoResource.get({"id":$routeParams.id}, function(photo) {
			$scope.photo = photo;
			
		}, function(data, status) {
			console.log(data);
		});
	}
	
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) {
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