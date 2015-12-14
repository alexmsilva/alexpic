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
			remover : "&remove"
		},
		transclude : true,
		templateUrl : "js/directives/a-card.html"
	};
});