angular.module('myApp.pointpage1', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/pointpage1', {
			templateUrl: 'app/pointpage1/pointpage.html',
			controller: ''  //Add a controller here later if we need it
		});
	}])
