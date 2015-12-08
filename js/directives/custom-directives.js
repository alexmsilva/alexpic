angular.module("customDirectives", [])
.directive("aCard", function() {
	var ddo = {}; // Directive Definition Object
	
	ddo.restrict = "AE"; // A = use as attribute, E use as Element
	
	ddo.scope = {
		title : "@title"
	};

	ddo.transclude = true; // enable copy of the content

	ddo.templateUrl = "js/directives/a-card.html";

	//return ddo;

	return {
		restrict : "AE",
		scope : { title : "@title" },
		transclude : true,
		templateUrl : "js/directives/a-card.html"
	};
});