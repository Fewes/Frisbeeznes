angular.module('myApp.trackpage', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/trackpage', {
            templateUrl: 'app/trackpage/trackpage.html',
            controller: '??'  //Add a controller here later if we need it
        });
    }])