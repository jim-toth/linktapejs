var linktapeSong = angular.module('linktapeSong', []);

linktapeSong.directive('lsSong', [function ($scope) {
	return {
		restrict: 'E',
		scope: {
			song: '='
		},
		templateUrl: 'js/directives/ls-song.html'
	};
}]);