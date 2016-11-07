angular.module('myApp.holepage', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/holepage', {
            templateUrl: 'app/holepage/holepage.html',
            controller: '??'  //Add a controller here later if we need it
        });
    }])