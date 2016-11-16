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

	$scope.goToPointPage = function () {
		location.href ="#!/pointpage";
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
		if($scope.players.length > 1){
			var index = $scope.players.indexOf(item);
			$scope.players.splice(index, 1);
		}
	}

	//Add a plyer to the list
	$scope.addPlayer = function() {
		if($scope.players.length < 5){				//Cap the maximum players to 5;
			okPName = $scope.createPlayerName(1);
			$scope.players.push({name:okPName, holes:[], score:Math.floor(Math.random() * 100) + 1  });
			for (i = 0; i < $scope.courseInfo.holes.length; i++) {
				$scope.players[$scope.players.length-1].holes[i] = 0;
			}
		}

	}

	$scope.createPlayerName = function (testNum) {
		var temp = ('Player ' + testNum);
		for(var i = 0; i < $scope.players.length; i++){
			if($scope.players[i].name == ('Player ' + testNum)){
				temp = $scope.createPlayerName(testNum + 1);
				break;
			}
		}
		return temp;
	}

	$scope.totalScore = function () {
		for(var i = 0; i < $scope.players.length; i++){
			$scope.players[i].score = 0;
			for(var k = 0; k < $scope.players[i].holes.length; k++){
				$scope.players[i].score += $scope.players[i].holes[k];
			}
		}
	}
	
	$scope.sortByScore = function () {
		$scope.players.sort(function(a, b){
			return a.score-b.score;
		});
	}

	/*Function to see if the value is 0 or the maximum allowed,
	 if so fade the buttons and disable them*/
	$scope.fadeButton = function (p, pressedBtn) {
		var id = $scope.players.indexOf(p);
		var classLoc = pressedBtn;

		if(p.holes[$scope.hole] > 0 && classLoc == "negButton"){
			//document.getElementById(id).textContent = "" + (numberOfThrows - 1);
			--p.holes[$scope.hole];
			document.getElementById(id).parentNode.getElementsByClassName("posButton")[0].style.color = "rgba(0,255,0,0.2)";
		}
		else if(p.holes[$scope.hole] < 8 && classLoc == "posButton") {
			//document.getElementById(id).textContent = "" + (numberOfThrows + 1);
			++p.holes[$scope.hole];
			document.getElementById(id).parentNode.getElementsByClassName("negButton")[0].style.color = "rgba(255,0,0,0.2)";
		}

		if(p.holes[$scope.hole] == 0){
			document.getElementById(id).parentNode.getElementsByClassName("negButton")[0].style.color = "rgba(191,191,191,0.2)";
		}
		else if(p.holes[$scope.hole] == 8){
			document.getElementById(id).parentNode.getElementsByClassName("posButton")[0].style.color = "rgba(191,191,191,0.2)";
		}
	}

	//Runs when the controller loads
	$scope.courseOptions();

	$scope.courseChoice("de_dust_2");

	$scope.players = [];
	$scope.players.push({name:'Player 1', holes:[], score:1337});


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

app.filter('startFrom', function() {
	return function(input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return[];
	}
});