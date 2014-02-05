var linktapeControllers = angular.module('linktapeControllers', []);

linktapeControllers.controller('PlaylistCtrl', ['$scope', 'Playlist', function ($scope, Playlist) {
    $scope.playlist_data = Playlist.get({ pid: '2fcktcp0w' }, function (playlist_data) {
		$scope.pid = playlist_data.pid;
		$scope.title = playlist_data.name;
		$scope.playlist = playlist_data.playlist;
    });
}]);