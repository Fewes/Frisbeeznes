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
		readFile.query({courseFileName: $scope.courseFileName},function(result){
			$scope.courseInfo = result[0];
		});
	}

	$scope.holeChoice = function (hNum) {
		$scope.hole = hNum;
	}

	//Reads in all the different coursenames
	$scope.courseOptions = function () {
		$scope.courseFileName = "courses";
		readFile.query({courseFileName: "courses"},function(result){
			$scope.courses = result;
		});
	}


	$scope.checkifPlayer = function () {
		if($scope.players.length==0){
			$scope.addPlayer();
		}else{
			for (var i = 0; i < $scope.players.length; i++) {
				if($scope.players[i].holes.length != $scope.courseInfo.holes.length) {
					$scope.players[i].holes = [];
					for (var k = 0; k < $scope.courseInfo.holes.length ; k++) {
						$scope.players[i].holes[k] = 0;
					}
				}
			}
		}
	}


	//Removes the player that is send in
	$scope.removePlayer = function(item) {
		var index = $scope.players.indexOf(item);
		$scope.players.splice(index, 1);
	}

	//Add a plyer to the list
	$scope.addPlayer = function() {
		okPName = $scope.createPlayerName(1);
		$scope.players.push({name:okPName, holes:[]});
		for (i = 0; i < $scope.courseInfo.holes.length; i++) {
			$scope.players[$scope.players.length-1].holes[i] = 0;
		}

	}

	$scope.createPlayerName = function (testNum) {
		temp = ('Player ' + testNum);
		for(i = 0; i < $scope.players.length; i++){
			if($scope.players[i].name == ('Player ' + testNum)){
				temp = $scope.createPlayerName(testNum + 1);
				break;
			}
		}
		return temp;
	}

	//Runs when the controller loads
	$scope.courseOptions();

	$scope.players = [];
	$scope.players.push({name:'Player 1', holes:[]});

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