'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.startpage',
	'myApp.scorecard',
	'myApp.tracks',
	'myApp.trackpage',
	'myApp.holepage',
	'myApp.holes',
	'myApp.result',
	'myApp.mainmodule',
	'myApp.read',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider.otherwise({redirectTo: '/startpage'}); //<--- write the page we want to start on
}]);