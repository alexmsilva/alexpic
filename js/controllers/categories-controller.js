angular.module("alexpic").controller("CategoriesController", function($scope, $http){
	$scope.categories = [];

	$http.get("api/categories.php").success(function(categories) {
		$scope.categories = categories;
	})
	.error(function(data, status) {
		console.log(data);
	});
});