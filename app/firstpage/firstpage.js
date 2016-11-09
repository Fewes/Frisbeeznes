angular.module('myApp.firstpage', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/firstpage', {
			templateUrl: 'app/firstpage/firstpage.html',
			controller: 'mainCtrl'  //Add a controller here later if we need it
		});
	}])
