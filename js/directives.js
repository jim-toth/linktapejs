var linktapeSong = angular.module('linktapeSong', ['linktapeServices']);

linktapeSong.directive('lsSong', ['ResolveURI', function (ResolveURI) {
	SCOPTS = {
		"auto_play" : false,
		"show_comments" : false,
		"iframe" : true
	};

	function link($scope, $element, $attrs) {
		var $playlistScope = $scope.$parent.$parent;
		if($scope.song.song_type == 'sc') {
			ResolveURI.get({ uri: $scope.song.uri }, function (uri_data) {
				SC.get('/resolve', { url: uri_data.resolvedURL }, function (track) {
					if(track.embeddable_by == 'all') {
						$scope.song.track = track;
						SC.oEmbed('http://api.soundcloud.com/tracks/' + track.id, SCOPTS, function (oEmbed) {
							
							$element.find('div').replaceWith(oEmbed.html);
							$scope.song.player = SC.Widget($element.find('iframe')[0]);

							$scope.song.player.bind(SC.Widget.Events.PLAY, function (ev) {
								if (typeof $playlistScope.currentSong != 'undefined') {
									if($playlistScope.currentSong !== $scope.song) {
										$playlistScope.currentSong.stop();
										$playlistScope.currentSong = $scope.song;
									}
								} else {
									$playlistScope.currentSong = $scope.song;
								}
								
								$scope.$apply(function () {
									$scope.setplaying({isPlaying: true});
								});
							});

							$scope.song.player.bind(SC.Widget.Events.PAUSE, function () {
								if ($playlistScope.currentSong != 'undefined') {
									if($playlistScope.currentSong === $scope.song) {
										$scope.$apply(function () {
											$scope.setplaying({isPlaying: false});
										});
									}
								}
							});
							
							$scope.song.toggle = function () {
								$scope.song.player.toggle();
							}

							$scope.song.stop = function () {
								$scope.song.player.pause();
								$scope.song.seek(0);
							}

						});
					} else {
						// TODO: notify user of restriction
					}
				});
			});
		}
	}

	return {
		restrict: 'E',
		scope: {
			song: '=song',
			setplaying: '&setplaying'
		},
		templateUrl: 'js/directives/ls-song.html',
		link: link,
	};
}]);

linktapeSong.directive('lsControls', [function () {
	return {
		restrict: 'E',
		scope: {
			playlist: '='
		},
		templateUrl: 'js/directives/ls-controls.html'
	};
}]);