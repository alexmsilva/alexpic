angular.module("alexpic").controller("PhotoController", function($scope, $http, $mdToast, $routeParams) {

	$scope.photo = {};

	// load a photo when there's a id passed by param
	if ($routeParams.id) {
		$http.get("api/photos.php?id=" + $routeParams.id).success(function(data) {
			$scope.photo = data;
	
		}).error(function(data, status) {
			console.log(data);
		});
	}
	
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) {
			if ($scope.photo._id) {
				$http.post("api/photos.php", $scope.photo)
				.success(function(data) {
					$scope.photo = {};
					$scope.showMessage("A Foto foi alterada com sucesso!");
				})
				.error(function(data, status) {
					$scope.showMessage("Não foi possível alterar a foto.");
				});
			}
			else {
				$http.put("api/photos.php", $scope.photo)
				.success(function(data) {
					$scope.photo = {};
					$scope.showMessage("Foto adicionada com sucesso!");
				})
				.error(function(data, status) {
					$scope.showMessage("Não foi possível cadastrar a foto.");
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