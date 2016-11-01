'use strict';

angular.module('myApp.weather', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/weather', {
    templateUrl: 'app/weather/weather.html',
    controller: 'WeatherCtrl'
  });
}])
.controller('WeatherCtrl', ["$scope", "weatherForecast", function($scope, weatherForecast) {

    $scope.changeLocation = function(){
        weatherForecast.query({location: $scope.location},function(result){
            $scope.weatherData = result[0];
            $scope.currentForecast = $scope.weatherData.forecast[new Date().getDay()-1];
        });
    };

    $scope.showForecastDetails = function(forecast){
        $scope.currentForecast = forecast;
    };

    $scope.location = "campus-nkpg";
    $scope.changeLocation();
}]);