var linktapeApp = angular.module('linktapeApp', []);

linktapeApp.controller('PlaylistCtrl', function ($scope) {
	$scope.pid = "test";

	$scope.title = "MONGO Playlist";

	$scope.playlist = [{
        "title": "1 Train Ft. Kendrick Lamar, Joey Bada$$, Yelawolf, Danny Brown, Action Bronson, & Big K.R.I.T.",
        "artist": "A$AP Rocky",
        "uri": "http://hypem.com/track/1s1g0/",
        "song_type": "sc",
        "video_id": ""
    }, {
        "title": "Thinking Highly Of You",
        "artist": "Cop Magnet",
        "uri": "http://www.youtube.com/watch?v=r2wZ6O3ttP8",
        "song_type": "yt",
        "video_id": "r2wZ6O3ttP8"
    }, {
        "title": "Garbage",
        "artist": "Tyler The Creatro",
        "uri": "http://hypem.com/go/sc/1zfc6",
        "song_type": "sc",
        "video_id": ""
    }, {
        "title": "My Greed (BLVCK CEILING Remix)",
        "artist": "FRXXMASONS",
        "uri": "http://youtu.be/noA2aodX-9c",
        "song_type": "yt",
        "video_id": "noA2aodX-9c"
    }];
});