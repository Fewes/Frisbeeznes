angular.module('myApp.pointpage', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/pointpage', {
			templateUrl: 'app/pointpage/pointpage.html',
			controller: ''  //Add a controller here later if we need it
		});
	}])
