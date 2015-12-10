angular.module("alexpic").controller("PhotoController", function($scope, $http, $mdToast) {
	$scope.photo = {};
	$scope.savePhoto = function() {
		if ($scope.photoForm.$valid) { // Hey! How can I access this?
			$http.post("api/calls.php?action=new", $scope.photo)
			.success(function(data) {
				$scope.photo = {};
				$scope.showMessage("Foto adicionada com sucesso!");
			})
			.error(function(data, status) {
				$scope.showMessage("Não foi possível cadastrar a foto.");
			})
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