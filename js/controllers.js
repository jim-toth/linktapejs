var linktapeControllers = angular.module('linktapeControllers', []);

linktapeControllers.controller('PlaylistCtrl', ['$scope', 'Playlist', function ($scope, Playlist) {
	$scope.playlist_data = Playlist.get({ pid: '2fcktcp0w' }, function (playlist_data) {
		$scope.pid = playlist_data.pid;
		$scope.title = playlist_data.name;
		$scope.playlist = playlist_data.playlist;
		$scope.currentSong = undefined;
	});

	$scope.songPlaying = {};
	$scope.songPlaying.isPlaying = false;

	$scope.setSongPlaying = function (isPlaying) {
		$scope.songPlaying.isPlaying = isPlaying;
	}

	$scope.toggle = function () {
		if(typeof $scope.currentSong == 'undefined') {
			$scope.currentSong = $scope.playlist[0];
		}

		$scope.currentSong.toggle();
	}

	$scope.prev = function () {
		console.log('prev');
	}

	$scope.next = function () {
		console.log('next');
	}
}]);