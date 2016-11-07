/**
 * Created by Martini on 2016-11-07.
 */
angular.module('myApp.holes', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/holes', {
			templateUrl: 'app/holes/holes.html',
			controller: '??'  //Add a controller here later if we need it
		});
	}])
