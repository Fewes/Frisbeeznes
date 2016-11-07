/**
 * Created by Martini on 2016-11-07.
 */
angular.module('myApp.result', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/result', {
			templateUrl: 'app/result/result.html',
			controller: '??'  //Add a controller here later if we need it
		});
	}])
