var linktapeServices = angular.module('linktapeServices', ['ngResource']);

linktapeServices.factory('Playlist', ['$resource', function ($resource) {
	return $resource('/p/:pid',	{
			pid: '@pid'
		});
}]);

linktapeServices.factory('ResolveURI', ['$resource', function ($resource) {
	return $resource('/u?r=:uri', {}, {
		query: { method: 'GET', isArray: false }
	});
}]);