angular.module('myApp.scorecard', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/scorecard', {
		templateUrl: 'app/scorecard/scorecard.html',
		controller: ''  //Add a controller here later if we need it
	});
}])
