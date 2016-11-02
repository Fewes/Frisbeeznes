/**
 * Created by Martini on 2016-11-02.
 */
angular.module('myApp.tracks', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/tracks', {
			templateUrl: 'app/tracks/tracks.html',
			controller: '??'  //Add a controller here later if we need it
		});
	}])
