var app = angular.module('myApp.mainmodule',[]);
var read = angular.module('myApp.read', ['ngResource']);

app.controller('mainCtrl', ["$scope", "readFile", function($scope, readFile) {


	$scope.courseChoice = function (courName) {
		//$scope.courseName = courName;
		$scope.courseFileName = "Linkoping_Ryds_motioncentrum";

		readFile.query({courseFileName: $scope.courseFileName},function(result){
			$scope.courseInfo = result[0];
		});
		//location.href = "#!/trackpage";
	}

}]);

read.factory('readFile', ['$resource',
	function($resource) {
		return $resource('app/data/:courseFileName.json', {}, {
			query: {
				method: 'GET',
				params: {courseFileName: '@courseFileName'},
				isArray: true
			}
		});
	}
]);