angular.module("aServices", ['ngResource'])
.factory("photoResource", function($resource) {
	return photoResource = $resource("api/photos.php", null, {
		update : { method : "PUT" }
	});
});