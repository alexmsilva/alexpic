angular.module("alexpic").controller("PhotoController", function($scope, $http, $mdToast, $routeParams) {

	$scope.photo = {};
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) {
			if ($scope.photo._id) {
				$http.post("api/photos.php?action=edit", $scope.photo)
				.success(function(data) {
					$scope.photo = {};
					$scope.showMessage("A Foto foi alterada com sucesso!");
				})
				.error(function(data, status) {
					$scope.showMessage("Não foi possível alterar a foto.");
				});
			}
			else {
				$http.post("api/photos.php?action=new", $scope.photo)
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

	if ($routeParams.id) {
		$http.post("api/photos.php?action=get", {'id':$routeParams.id}).success(function(data) {
			$scope.photo = data;
	
		}).error(function(data, status) {
			console.log(data);
		});
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