angular.module("alexpic").controller("PhotoController", function($scope, $mdToast, $routeParams, photoResource) {

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
			if ($scope.photo._id) {
				photoResource.update($scope.photo, function() {
					$scope.photo = {};
					$scope.showMessage("A Foto foi alterada com sucesso!");

				}, function(data, status) {
					console.log(data);
				});
			}
			else {
				photoResource.save($scope.photo, function() {
					$scope.photo = {};
					$scope.showMessage("Foto adicionada com sucesso!");

				}, function(data, status) {
					console.log(data);
				});
			}
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