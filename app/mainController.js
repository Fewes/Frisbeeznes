var app = angular.module('myApp.mainmodule',[]);
var read = angular.module('myApp.read', ['ngResource']);

app.controller('mainCtrl', ["$scope", "readFile", function($scope, readFile) {

	$scope.courseName = "erik är dum i huvudet";
	$scope.courseFileName;
	$scope.courseChoice = function () {
		$scope.courseName = "KFUM Norrköping";
		$scope.courseFileName = "KFUM_Norrkoping";

		readFile.query({location: $scope.courseFileName},function(result){
			$scope.courseInfo = result[0];
			alert($scope.courseName);
		});
		location.href = "#!/trackpage";
	}

}]);

read.factory('readFile', ['$resource',
	function($resource) {
		return $resource('app/data/KFUM_Norrkoping.json', {}, {
			query: {
				method: 'GET',
				params: {},
				isArray: true
			}
		});
	}
]);