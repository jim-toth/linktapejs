var linktapeApp = angular.module('linktapeApp', ['ngRoute', 'linktapeControllers', 'linktapeServices', 'linktapeSong', function () {
	// initialize soundcloud
	// TODO: Move client_id to config file.
	SC.initialize({ client_id: '8320c8fe21f98b89ad50068014b92068' });
}]).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.when('/:pid', { templateUrl: 'index.html', controller: 'RouteCtrl' });

	$locationProvider.html5Mode(true);
}]);