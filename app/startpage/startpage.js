/**
 * Created by Erik Åkesson on 2016-11-01.
 */
angular.module('myApp.startpage', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/startpage', {
            templateUrl: 'app/startpage/startpage.html',
            controller: '??'  //Add a controller here later if we need it
        });
    }])
