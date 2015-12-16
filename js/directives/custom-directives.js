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
})
.directive("aFocus", function() {
	var ddo = {};
	ddo.restrict = "A";
	ddo.scope = {
		focused : "=" // = pass a value and not a string
	};

	// angular has two fases, compile and link
	// in link fase, it's possible to access the scope and the element DOM
	ddo.link = function(scope, element) {
		scope.$watch("focused", function() {
			if (scope.focused) { // need focus
				//para manipular DOM, o agular usa jqLite
				element[0].focus();
				scope.focused = false; // after focus a element... free the focus
			}
		});
	};

	return ddo;
});