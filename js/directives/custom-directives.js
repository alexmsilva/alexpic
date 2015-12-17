angular.module("aDirectives", [])
.directive("aFocus", function() {
	return {
		restrict : 'A',
		link : function(scope, element) {
			scope.$on("photoSaved", function() {
				element[0].focus();
			});
		}
	};
});