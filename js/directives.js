var linktapeSong = angular.module('linktapeSong', ['linktapeServices']);

linktapeSong.directive('lsSong', ['ResolveURI', function (ResolveURI) {
	var SCOPTS = {
		"auto_play" : false,
		"show_comments" : false,
		"iframe" : true
	};

	var YTOPTS = {
		'height': 400,
		'width': 400,
		'events': {
			'onError': function (err) {
				console.log(err);
			}

		},
		"playerVars": {
			"controls": 0,
			"enablejsapi": 1,
			"showinfo": 0
		}
	};

	function link($scope, $element, $attrs) {
		var $playlistScope = $scope.$parent.$parent;

		function SCPlay(ev) {
			// Stop current song, change current song to this song.
			if (typeof $playlistScope.currentSong != 'undefined') {
				if($playlistScope.currentSong !== $scope.song) {
					$playlistScope.currentSong.stop();
					$playlistScope.setCurrentSong($scope.song);
				}
			} else {
				$playlistScope.setCurrentSong($scope.song);
			}
			
			// Update playlist scope UI
			$scope.$apply(function () {
				$scope.setplaying({ isPlaying: true });
			});
		};

		function StreamPlay(ev) {
			// Stop current song, change current song to this song.
			if (typeof $playlistScope.currentSong != 'undefined') {
				if($playlistScope.currentSong !== $scope.song) {
					$playlistScope.currentSong.stop();
					$playlistScope.setCurrentSong($scope.song);
				}
			} else {
				$playlistScope.setCurrentSong($scope.song);
			}

			// Update playlist scope UI
			// $scope.$apply(function () {
				$scope.setplaying({isPlaying: true});
			// });
	
			$element.find('.song-info').removeClass('ls-song-paused');
			$element.find('.song-info').addClass('ls-song-playing');
		};

		function SCPause(ev) {
			// Update playlist scope UI
			if ($playlistScope.currentSong != 'undefined') {
				if($playlistScope.currentSong === $scope.song) {
					$scope.$apply(function () {
						$scope.setplaying({isPlaying: false});
					});
				}
			}
		};

		function StreamPause() {
			// Update playlist scope UI
			if ($playlistScope.currentSong != 'undefined') {
				if($playlistScope.currentSong === $scope.song) {
					// $scope.$apply(function () {
						$scope.setplaying({isPlaying: false});
					// });
				}
			}

			$element.find('.song-info').removeClass('ls-song-playing');
			$element.find('.song-info').addClass('ls-song-paused');
		};

		function SCFinish(ev) {
			$playlistScope.next();
		};

		function StreamFinish() {
			$playlistScope.next();

			$element.find('.song-info').removeClass('ls-song-playing ls-song-paused');
		};

		function StreamStop() {

			$element.find('.song-info').removeClass('ls-song-playing ls-song-paused');
		};

		function handleYoutubeState(event) {
			console.log(event);

			if(event.data == YT.PlayerState.ENDED) {
				$playlistScope.next();
			} else if(event.data == YT.PlayerState.PLAYING) {
				// Stop current song, change current song to this song.
				if (typeof $playlistScope.currentSong != 'undefined') {
					if($playlistScope.currentSong !== $scope.song) {
						$playlistScope.currentSong.stop();
						$playlistScope.setCurrentSong($scope.song);
					}
				} else {
					$playlistScope.setCurrentSong($scope.song);
				}

				$scope.$apply(function () {
					$scope.setplaying({ isPlaying: true });
				});
			} else if(event.data == YT.PlayerState.PAUSED) {
				// Update playlist scope UI
				if ($playlistScope.currentSong != 'undefined') {
					if($playlistScope.currentSong === $scope.song) {
						$scope.$apply(function () {
							$scope.setplaying({isPlaying: false});
						});
					}
				}
			}
		};

		// Resolve URL (for shortened links)
		function handleURI(uri) {
			if (typeof $scope.song.song_type == 'undefined') {
				if (uri.host() == 'soundcloud.com' || uri.host() == 'www.soundcloud.com') {
					$scope.song.song_type = 'sc';
				} else if (uri.host() == 'hypem.com' || 'www'+uri.host() == 'hypem.com') {
					var path = uri.path().split('/');

					if (path[1] == 'go') {
						$scope.song.song_type = 'sc'
					} else if (path[1] == 'track') {
						$scope.song.song_type = 'sc';
						$scope.song.uri = 'http://hypem.com/go/sc/' + path[2];
					} else {
						console.error('Malformed hypem link.');
					}
				} else if(uri.host() == 'youtube.com' || uri.host() == 'www.youtube.com') {
					$scope.song.song_type = 'yt';
					$scope.song.video_id = uri.getQueryParamValue('v');
				} else if(uri.host() == 'youtu.be') {
					$scope.song.song_type = 'yt';
					$scope.song.video_id = uri.path();
				} else if(uri.host() == 'google.com' || uri.host() == 'www.google.com') {
					$scope.song.uri = decodeURIComponent(uri.getQueryParamValue('url'));
					handleURI(new Uri($scope.song.uri));
				}
			}
		}

		handleURI(new Uri($scope.song.uri));

		ResolveURI.get({ uri: $scope.song.uri }, function (uri_data) {

			// Embed Song
			if($scope.song.song_type == 'sc') {

				// Resolve SC track
				SC.get('/resolve', { url: uri_data.resolvedURL }, function (track) {
					
					// Remember track info
					$scope.song.track = track;

					// Check embed permissions
					if(track.embeddable_by == 'all') {

						// SC.stream('http://api.soundcloud.com/tracks/' + track.id, SCOPTS, function (audio) {
							
						// 	$scope.song.player = audio;

						// 	audio.load({
						// 		onplay: StreamPlay,
						// 		onpause: StreamPause,
						// 		onfinish: StreamFinish,
						// 		onstop: StreamStop,
						// 		onload: function () {
						// 			console.log('Loaded: ' + $scope.song.artist + ' - ' + $scope.song.title);
						// 		},
						// 		onresume: function () {
						// 			console.log('Resumed: ' + $scope.song.artist + ' - ' + $scope.song.title);
						// 		},
						// 		whileplaying: function () {
						// 			console.log('Playing: ' + $scope.song.artist + ' - ' + $scope.song.title);	
						// 		}
						// 	});

						// 	$scope.song.toggle = function () {
						// 		$scope.song.player.togglePause();
						// 	};

						// 	$scope.song.stop = function () {
						// 		$scope.song.player.stop();
						// 		$scope.song.player.setPosition(0);
						// 	};
							
						// });

						// Embed SoundCloud widget
						SC.oEmbed('http://api.soundcloud.com/tracks/' + track.id, SCOPTS, function (oEmbed) {
							
							// Replace loading placeholder
							$element.find('div.song-info').replaceWith(oEmbed.html);
							$scope.song.player = SC.Widget($element.find('iframe')[0]);


							// Toggle song play/pause
							$scope.song.toggle = function () {
								$scope.song.player.toggle();
							}

							// Stop, reset song
							$scope.song.stop = function () {
								$scope.song.player.pause();
								$scope.song.player.seekTo(0);
							}

							$scope.song.rebind = function () {
								// Re-query for player iframe
								$scope.song.player = SC.Widget($element.find('iframe')[0]);

								// Bind PLAY event
								$scope.song.player.bind(SC.Widget.Events.PLAY, SCPlay);

								// Bind PAUSE event
								$scope.song.player.bind(SC.Widget.Events.PAUSE, SCPause);

								// Bind FINISH event
								$scope.song.player.bind(SC.Widget.Events.FINISH, SCFinish);
							}

							$scope.song.player.bind(SC.Widget.Events.READY, function (ev) {
								$scope.song.rebind();
							});

						});
					} else {
						// TODO: notify user of embed restriction
					}
				});
			} else if ($scope.song.song_type == 'yt') {
				var theseOpts = $.extend(true, { 'videoId': $scope.song.video_id }, YTOPTS);
				theseOpts.events.onStateChange = handleYoutubeState;
				theseOpts.events.onReady = function () {
					$scope.song.toggle = function () {
						if ($scope.song.player.getPlayerState() == YT.PlayerState.PLAYING) {
							$scope.song.player.pauseVideo();
						} else {
							$scope.song.player.playVideo();
						}
					}

					$scope.song.stop = function () {
						$scope.song.player.seekTo(0);
						$scope.song.player.pauseVideo();
					}
				};
				var ytid = 'yt'+Date.now();
				$element.find('div.song-info').replaceWith('<div id="' + ytid + '"></div>');
				$scope.song.player = new YT.Player(ytid, theseOpts);

				$scope.song.rebind = function () {
					$scope.song.player = new YT.Player(ytid, theseOpts);
				};
			}
		});
	};

	function controller($scope, $element) {
		var $playlistScope = $scope.$parent.$parent;

		$scope.destroy = function () {
			$playlistScope.removeSong($scope.songIdx);
		};
	};

	return {
		restrict: 'E',
		scope: {
			song: '=song',
			setplaying: '&setplaying',
			songIdx: '=idx'
		},
		templateUrl: 'js/directives/ls-song.html',
		controller: controller,
		link: link
	};
}]);

linktapeSong.directive('lsControls', [function () {
	function controller($scope, $element) {

		$scope.handlePaste = function (playlist, ev) {

			// Check for clipboard data
			if(ev.originalEvent.clipboardData.items.length > 0) {

				// Create new song directive
				playlist.push({ uri: ev.originalEvent.clipboardData.getData('text/plain') });
			}
		}
	};

	return {
		restrict: 'E',
		scope: {
			playlist: '='
		},
		templateUrl: 'js/directives/ls-controls.html',
		controller: controller
	};
}]);

linktapeSong.directive('lsTitle', ['$timeout', '$parse', function ($timeout, $parse) {
	function link($scope, $element, $attrs) {

		// Bind enter key to stop editing title
		$element.find('input').keypress(function (e) {
			if (e.which == 13) {
				$timeout(function () {
					$scope.editing = false;
				});
			}
		});

		// Focus input when editing title
		$scope.$watch('editing', function (isEditing) {
			if (isEditing === true) {
				$timeout(function () {
					$element.find('input').focus();
				});
			}
		});
	};

	return {
		restrict: 'E',
		scope: {
			title: '='
		},
		templateUrl: 'js/directives/ls-title.html',
		link: link
	};
}]);