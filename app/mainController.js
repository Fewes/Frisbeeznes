var app = angular.module('myApp.mainmodule',[]);
var read = angular.module('myApp.read', ['ngResource']);

app.controller('mainCtrl', ["$scope", "readFile", '$anchorScroll', '$location', '$timeout',	function($scope, readFile, $anchorScroll, $location, $timeout, $mdDialog) {

	//used to select the animation to be used
	$scope.animationTypeSelection = function (animationName) {
		$scope.animationTypeClass = animationName;
	}

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


		if(parseInt($scope.courseFileName.length) > parseInt(13)){
			$scope.courseFileName = $scope.courseFileName.slice(0,12) + "...";
			$scope.courseInfo.name = $scope.courseFileName;
		}
	}

	$scope.holeChoice = function (hNum) {
		$timeout(function () {
			if(hNum < 0){
				$scope.hole = $scope.courseInfo.holes.length - 1;
			}else if(hNum > $scope.courseInfo.holes.length - 1){
				$scope.hole = 0;
			}else{
				$scope.hole = hNum;
			}
		})
	}

	$scope.goToPointPage = function () {
		if(location.href.split("#!/")[1] == "pointpage"){
			$timeout(function () {
				location.href ="#!/pointpage1";
			})
		}else{
			$timeout(function () {
				location.href ="#!/pointpage";
			})
		}

	}

	$scope.goToPage = function (page) {
		$timeout(function () {
			location.href = page;
		})

	}

	//Reads in all the different coursenames
	$scope.courseOptions = function () {
		$scope.courseFileName = "courses";
		readFile.query({courseFileName: "courses"},function(result){
			$scope.courses = result;
		});
	}


	$scope.reWritePlayers = function () {
		if($scope.players.length != 0){
			for (var i = 0; i < $scope.players.length; i++) {
				$scope.players[i].score = 0;
				$scope.players[i].holes = [];
				for (var k = 0; k < $scope.courseInfo.holes.length ; k++) {
					$scope.players[i].holes[k] = 0;
				}
			}
		}
	}


	//Removes the player that is send in
	$scope.removePlayer = function(item) {
		var index = $scope.players.indexOf(item);
		$scope.players.splice(index, 1);
		if($scope.players.length == 0){
			$scope.btnActive = {"disabled":true};
		}
		document.getElementsByClassName("addSign")[0].style.color = "rgb(75, 134, 75)";
	}

	//Add a plyer to the list
	$scope.addPlayer = function() {
		$scope.btnActive = {"disabled":false};
		if($scope.players.length < 5){				//Cap the maximum players to 5;
			var okPName = $scope.createPlayerName(1);
			$scope.players.push({name:okPName, holes:[], score:0});
			for (var i = 0; i < $scope.courseInfo.holes.length; i++) {
				$scope.players[$scope.players.length-1].holes[i] = 0;
			}
			if($scope.players.length == 5){
				document.getElementsByClassName("addSign")[0].style.color = "rgba(191,191,191,0.2)";
			}
		}
	}

	$scope.preventmarkPlayer = function () {
		$scope.dontMarkPlayer = $scope.players.length;
		if($scope.players.length == 5){
			document.getElementsByClassName("addSign")[0].style.color = "rgba(191,191,191,0.2)";
		}
	}

	$scope.markPlayer = function () {
		if($scope.dontMarkPlayer > 0){
			$scope.dontMarkPlayer -= 1;
		}else{
			$timeout(function () {
				var elementet = document.getElementsByClassName("playerDiv")[$scope.players.length - 1].getElementsByClassName("nameText")[0];
				elementet.focus();
				elementet.setSelectionRange(0, elementet.value.length);
				document.getElementsByClassName("playerCont")[0].scrollTop = 10000; //Just a high value to ensure it´s always scrolls
			})
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
		$scope.totalPar = 0;
		for(var k=0; k < $scope.courseInfo.holes.length; k++){
			$scope.totalPar += parseInt($scope.courseInfo.holes[k].par);
		}
		for(var i = 0; i < $scope.players.length; i++){
			$scope.players[i].score = 0;
			for(var k = 0; k < $scope.players[i].holes.length; k++){
				$scope.players[i].score += $scope.players[i].holes[k];
			}
			$scope.players[i].par = parseInt($scope.players[i].score - $scope.totalPar);
		}
	}

	$scope.overUnderPar = function() {
		$timeout(function () {
			for(var i = 0; i < $scope.players.length; i++) {
				for(var k = 0; k < $scope.courseInfo.holes.length; k++) {
					if($scope.players[i].holes[k] != 0) {

						var className = document.getElementsByClassName("playerSquare");

						if ($scope.courseInfo.holes[k].par < $scope.players[i].holes[k]) {
							className[$scope.players.length*k+i].style.backgroundColor = "rgba(173, 59, 59, 0.66)";
						}
						else if ($scope.courseInfo.holes[k].par > $scope.players[i].holes[k]) {
							className[$scope.players.length*k+i].style.backgroundColor = "rgba(0, 255, 0, 0.3)";
						}
						else if ($scope.courseInfo.holes[k].par == $scope.players[i].holes[k]) {
							className[$scope.players.length*k+i].style.backgroundColor = "rgba(219, 213, 63, 0.59)";
						}
					}
				}
			}
		});
	}

	//work in progress
	/* Function to see if all holes have been played, if not have a popup
	to ask the user if they want to end the game */
	$scope.allHolesPlayed = function(ev) {

		console.log("funk");

		$scope.customFullscreen = false;
		var i = 0, k = 0, done = false;

		while($scope.players[i].holes[k] != 0 && k != 18){
			if(done != true){
				i++;
				k++;
			}
			else {
				done = true;
				var finish = $mdDialog.confirm()
					.title('Vill du verkligen avsluta?')
					.textContent("Du kommer att lämna sidan om du klickar att gå vidare!")
					.targetEvent(ev)
					.ok('Ja, jag vill avsluta')
					.cancel('Jag vill fortsätta spela');

				$mdDialog.show(confirm).then(function() {
					console.log("ja knapp");
					location.href ="#!/result";
				}, function(){
					return false;
				});
			};

		};
	};
	
	$scope.sortByScore = function () {
		$scope.players.sort(function(a, b){
			return a.score-b.score;
		});
	}

	$scope.checkAllFadeBtn = function () {
		$timeout(function () {
			for(var i = 0; i < $scope.players.length; i++){
				var id = $scope.players.indexOf($scope.players[i]);

				if($scope.players[i].holes[$scope.hole] == 0){
					document.getElementById(id).parentNode.getElementsByClassName("negButton")[0].style.color = "rgba(191,191,191,0.2)";
				}
				else if($scope.players[i].holes[$scope.hole] == 8){
					document.getElementById(id).parentNode.getElementsByClassName("posButton")[0].style.color = "rgba(191,191,191,0.2)";
				}
			}
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
			document.getElementById(id).parentNode.getElementsByClassName("posButton")[0].style.color = "rgb(75, 134, 75)";
		}
		else if(p.holes[$scope.hole] < 8 && classLoc == "posButton") {
			//document.getElementById(id).textContent = "" + (numberOfThrows + 1);
			++p.holes[$scope.hole];
			document.getElementById(id).parentNode.getElementsByClassName("negButton")[0].style.color = "rgb(185, 66, 66)";
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
	$scope.animationTypeClass = "slide-right";
	$scope.players = [];
	$scope.btnActive = {"disabled":true}; //Setting the start button to disabled at start in playerpage

	//to plesure felix
		$scope.courseOptions();
		$scope.courseChoice("de_dust2");

		$timeout(function () {
			$scope.holeChoice(4);
			$scope.addPlayer();
			$scope.addPlayer();
			$scope.addPlayer();
			$scope.addPlayer();
			$scope.addPlayer();
		});


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