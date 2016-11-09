var app = angular.module('myApp.mainmodule',[]);
app.controller('mainCtrl', function($scope) {

	$scope.courseChoice = function () {
		$scope.courseName = "KFUM Norrkoping";
	}
});