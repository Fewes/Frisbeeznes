'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/Here wee need to write stuff'}); //<--- write the page we want to start on
}]);