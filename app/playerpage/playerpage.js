/**
 * Created by Erik on 2016-11-13.
 */

angular.module('myApp.playerpage', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/playerpage', {
			templateUrl: 'app/playerpage/playerpage.html',
			controller: ''  //Add a controller here later if we need it
		});
	}])

