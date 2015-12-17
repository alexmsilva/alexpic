angular.module("aServices", ['ngResource'])
.factory("photoResource", function($resource) {
	return photoResource = $resource("api/photos.php", null, {
		update : { method : "PUT" }
	});
})
.factory("photoSavior", function(photoResource, $q, $rootScope) {
	var save_event = "photoSaved";

	var service = {};
	service.save = function(photo) {
		return $q(function(resolve, reject) {
			if (photo._id) {
				photoResource.update(photo, function() {
					$rootScope.$broadcast(save_event);
					resolve({
						message : "A foto " + photo.title + " foi alterada com sucesso!",
						inclusion : false
					});

				}, function(data, status) {
					console.log(data);
					reject({
						message : "Não foi possível alterar a foto " + photo.title
					});
				});
			}
			else {
				photoResource.save(photo, function() {
					$rootScope.$broadcast(save_event);
					resolve({
						message : "A foto " + photo.title + " foi incluída com sucesso!",
						inclusion : true
					});

				}, function(data, status) {
					console.log(data);
					reject({
						message : "Não foi possível cadastrar a foto " + photo.title
					});
				});
			};
		
		}); //$q
	}

	return service;
});