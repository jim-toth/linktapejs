var linktapeFilters = angular.module('linktape.filters', []);

linktapeFilters.filter('linktapeTitle', [function() {
	return function (title) {
		return (title == 'Linktape') ? 'Linkta.pe' : 'Linkta.pe - ' + title;
	};
}]);