var linktapeSong = angular.module('linktapeSong', ['linktapeServices']);

linktapeSong.directive('lsSong', ['ResolveURI', function (ResolveURI) {
	var SCOPTS = {
		"auto_play" : false,
		"show_comments" : false,
		"iframe" : true
	};

	function link($scope, $element, $attrs) {
		if($scope.song.song_type == 'sc') {
			ResolveURI.get({ uri: $scope.song.uri }, function (uri_data) {
				SC.get('/resolve', { url: uri_data.resolvedURL }, function (track) {
					SC.oEmbed('http://api.soundcloud.com/tracks/'+track.id, SCOPTS, function (oEmbed) {
						$element.find('div').replaceWith(oEmbed.html);
					});
				});
			});
		}
	}

	return {
		restrict: 'E',
		scope: {
			song: '='
		},
		templateUrl: 'js/directives/ls-song.html',
		link: link
	};
}]);