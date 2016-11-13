var app = angular.module('myApp.mainmodule',[]);
var read = angular.module('myApp.read', ['ngResource']);

app.controller('mainCtrl', ["$scope", "readFile", function($scope, readFile) {

	//Reads in all the info about the choosen course and redirect to the trackpage
	$scope.courseChoice = function (cName) {
		$scope.courseName = cName;
		cName = cName.toString()
		cName = cName.replace(/ /g, "_");
		cName = cName.replace(/å/g, "a");
		cName = cName.replace(/ä/g, "a");
		cName = cName.replace(/ö/g, "o");
		cName = cName.replace(/Å/g, "A");
		cName = cName.replace(/Ä/g, "A");
		cName = cName.replace(/Ö/g, "O");
		$scope.courseFileName = cName;
		console.log(cName);
		readFile.query({courseFileName: $scope.courseFileName},function(result){
			$scope.courseInfo = result[0];
		});
		location.href = "#!/trackpage";
	}

	//Reads in all the different coursenames
	$scope.courseOptions = function () {
		$scope.courseFileName = "courses";
		readFile.query({courseFileName: "courses"},function(result){
			$scope.courses = result;
		});
	}

	//Removes the player that is send in
	$scope.removePlayer = function(item) {
		var index = $scope.players.indexOf(item);
		$scope.players.splice(index, 1);
	}

	//Removes the player that is send in
	$scope.addPlayer = function() {
		$scope.players.push({name:'Player ' + ($scope.players.length + 1), score:'0'});
	}

	//Runs when the controller loads
	$scope.courseOptions();

	$scope.players = [];
	$scope.players[0] = {name:'Player 1', score:'0'}

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