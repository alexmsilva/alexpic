angular.module("customDirectives", [])
.directive("aCard", function() {
	var ddo = {}; // Directive Definition Object
	
	ddo.restrict = "AE"; // A = use as attribute, E use as Element
	
	ddo.scope = {
		_id : "@photo_id",
		title : "@title"
	};

	ddo.transclude = true; // enable copy of the content

	ddo.templateUrl = "js/directives/a-card.html";

	//return ddo;

	return {
		restrict : "AE",
		scope : { 
			title : "@title",
			photo_id : "@identifier",
		},
		transclude : true,
		templateUrl : "js/directives/a-card.html",
		controller : function($scope, $http) {
			$scope.deletePhoto = function(id) {
				$http.post("api/photos.php?action=delete", {'id':id}).success(function(data) {
					// do something with response
					location.href="/"; // the beaty of angular is not to do this... but I dont have the list of photos here...
	
				}).error(function(data, status) {
					console.log(data);
				});
			}
		}
	};
});