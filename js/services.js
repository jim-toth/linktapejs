var linktapeServices = angular.module('linktapeServices', ['ngResource']);

linktapeServices.factory('Playlist', ['$resource', function ($resource) {
	return $resource('/p/:pid', {}, {
		query: { method: 'GET', params: { pid: 'test' }, isArray: false }
	});
}]);