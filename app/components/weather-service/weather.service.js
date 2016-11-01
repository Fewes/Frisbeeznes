'use strict';

// Define the `myApp.weatherService` module
var weatherService = angular.module('myApp.weatherService', ['ngResource']);

weatherService.factory('weatherForecast', ['$resource',
    function($resource) {
      return $resource('app/data/:location.json', {}, {
          query: {
            method: 'GET',
            params: {location: '@location'},
            isArray: true
          }
      });
    }
  ]);


