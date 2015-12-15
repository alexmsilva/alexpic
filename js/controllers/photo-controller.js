angular.module("alexpic").controller("PhotoController", function($scope, $mdToast, $routeParams, photoResource) {
	/* to avoid always to send an action, you may use http methods
		GET to get the images
		PUT to insert a new image
		DELETE to delete a image
		POST to edit a image
	*/

	$scope.photo = {};
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) { // Hey! How can I access this?
			if ($scope.photo._id) {
				photoResource.update($scope.photo, function() {
					$scope.photo = {};
					$scope.showMessage("A Foto foi alterada com sucesso!");

				}, function(data, status) {
					$scope.showMessage("Não foi possível alterar a foto.");
				});
				/*$http.post("api/photos.php?action=edit", $scope.photo)
				.success(function(data) {
					$scope.photo = {};
					$scope.showMessage("A Foto foi alterada com sucesso!");
				})
				.error(function(data, status) {
					$scope.showMessage("Não foi possível alterar a foto.");
				});*/
			}
			else {
				photoResource.newPhoto($scope.photo, function() {
					$scope.photo = {};
					$scope.showMessage("Foto adicionada com sucesso!");

				}, function(data, status) {
					$scope.showMessage("Não foi possível cadastrar a foto.");
				});
				/*$http.post("api/photos.php?action=new", $scope.photo)
				.success(function(data) {
					$scope.photo = {};
					$scope.showMessage("Foto adicionada com sucesso!");
				})
				.error(function(data, status) {
					$scope.showMessage("Não foi possível cadastrar a foto.");
				});*/
			}
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