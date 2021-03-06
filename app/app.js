'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'ngAnimate',
	'myApp.startpage',
	'myApp.scorecard',
	'myApp.tracks',
	'myApp.trackpage',
	'myApp.holepage',
	'myApp.holes',
	'myApp.result',
	'myApp.firstpage',
	'myApp.pointpage',
	'myApp.pointpage1',
	'myApp.mainmodule',
	'myApp.read',
	'myApp.playerpage',
])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	$locationProvider.hashPrefix('!');

	$routeProvider.otherwise({redirectTo: '/startpage'}); //<--- write the page we want to start on
}]);