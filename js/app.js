var linktapeApp = angular.module('linktapeApp', ['ngRoute', 'linktapeControllers', 'linktapeServices', 'linktapeSong', function () {
	// initialize soundcloud
	SC.initialize({ client_id: '8320c8fe21f98b89ad50068014b92068' });
}]);