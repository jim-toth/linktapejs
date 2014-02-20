var linktapeControllers = angular.module('linktapeControllers', ['ui.sortable']);

linktapeControllers.controller('RouteCtrl', [function ($scope, $route, $routeParams) {
	console.log('routed!');
}]);

linktapeControllers.controller('PlaylistCtrl', ['$scope', 'Playlist', '$timeout', '$location', function ($scope, Playlist, $timeout, $location) {
	// initialize
	$scope.init = function () {
		if($location.path() != '/') { //'zwuevfv67'
			$scope.playlist_data = Playlist.get({ pid: $location.path().substring(1) }, function (playlist_data) {
				$scope.pid = playlist_data.pid;
				$scope.title = playlist_data.name;
				$scope.playlist = playlist_data.playlist;
			});
		} else {
			$scope.pid = undefined;
			$scope.title = 'New Linktape';
			$scope.playlist = {};
		}

		$scope.currentSong = undefined;
		$scope.plstatus = { isPlaying: false };
	};

	// ui.sortable options
	$scope.sortableOptions = {
		stop: function(e, ui) {
			$scope.rebindAll();
		}
	}

	// Rebind SoundCloud player event listeners
	$scope.rebindAll = function () {
		angular.forEach($scope.playlist, function (song, key) {
			$timeout(function () {
				song.rebind();
				console.log('rebound!');
			}, 1000)
		});
	}

	// Update the current song's play status (UI)
	$scope.setplaying = function (isPlaying) {
		$scope.plstatus.isPlaying = isPlaying;
	};

	// Sets the current song
	$scope.setCurrentSong = function (song) {
		$scope.currentSong = song;
	};

	// Toggle play/pause of current song
	$scope.toggle = function () {
		if(typeof $scope.currentSong == 'undefined') {
			$scope.currentSong = $scope.playlist[0];
		}

		$scope.currentSong.toggle();
	};

	// Play previous song
	$scope.prev = function () {
		var currIdx = getIdxOfSong($scope.currentSong);

		if (typeof $scope.playlist[currIdx-1] != 'undefined') {
			$scope.playlist[currIdx-1].toggle();
			console.log('Prev song: ' + $scope.playlist[currIdx-1].artist + ' - ' + $scope.playlist[currIdx-1].title);
		} else {
			console.log('End of playlist');
		}
	};

	// Play next song
	$scope.next = function () {
		var currIdx = getIdxOfSong($scope.currentSong);

		if (typeof $scope.playlist[currIdx+1] != 'undefined') {
			$scope.playlist[currIdx+1].toggle();
			console.log('Next song: ' + $scope.playlist[currIdx+1].artist + ' - ' + $scope.playlist[currIdx+1].title);
		} else {
			console.log('End of playlist');
		}
	};

	// Save playlist
	$scope.save = function () {
		$scope.playlist_data.pid = ''; // generate new pid
		$scope.playlist_data.name = $scope.title;
		$scope.playlist_data.playlist = playlistToPlainArray();
		$scope.playlist_data.$save(function (u, head) {
			console.log('Saved Linktape: ' + u.pid);
			$location.path(u.pid);
		});
	};

	// Helper to get the playlist index of current song
	function getIdxOfSong(song) {
		var idx = -1;
		if(typeof $scope.playlist != 'undefined') {
			for(var i=0; i < $scope.playlist.length; i++) {
				if($scope.playlist[i] === song) {
					idx = i;
					break;
				}
			}
		}

		return idx;
	};

	// To plain object for saving
	function playlistToPlainArray() {
		var plistObj = [];

		angular.forEach($scope.playlist, function (value, key) {
			plistObj.push({
				artist: value.artist,
				title: value.title,
				song_type: value.song_type,
				uri: value.uri.toString()
			});
		});

		return plistObj;
	};

	$scope.init();
}]);