var linktapeControllers = angular.module('linktapeControllers', []);

linktapeControllers.controller('PlaylistCtrl', ['$scope', 'Playlist', function ($scope, Playlist) {
	$scope.playlist_data = Playlist.get({ pid: '2fcktcp0w' }, function (playlist_data) {
		$scope.pid = playlist_data.pid;
		$scope.title = playlist_data.name;
		$scope.playlist = playlist_data.playlist;
		$scope.currentSong = undefined;
		$scope.plstatus = { isPlaying: false };
	});

	$scope.setplaying = function (isPlaying) {
		$scope.plstatus.isPlaying = isPlaying;
	}

	$scope.setCurrentSong = function (song) {
		$scope.currentSong = song;
	}

	$scope.toggle = function () {
		if(typeof $scope.currentSong == 'undefined') {
			$scope.currentSong = $scope.playlist[0];
		}

		$scope.currentSong.toggle();
	}

	$scope.prev = function () {
		var currIdx = getIdxOfSong($scope.currentSong);

		if (typeof $scope.playlist[currIdx-1] != 'undefined') {
			$scope.playlist[currIdx-1].toggle();
			console.log('Prev song: ' + $scope.playlist[currIdx+1].artist + ' - ' + $scope.playlist[currIdx+1].title);
		} else {
			console.log('End of playlist');
		}
	}

	$scope.next = function () {
		var currIdx = getIdxOfSong($scope.currentSong);

		if (typeof $scope.playlist[currIdx+1] != 'undefined') {
			$scope.playlist[currIdx+1].toggle();
			console.log('Next song: ' + $scope.playlist[currIdx+1].artist + ' - ' + $scope.playlist[currIdx+1].title);
		} else {
			console.log('End of playlist');
		}
	}

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
	}
}]);