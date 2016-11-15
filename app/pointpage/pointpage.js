angular.module('myApp.pointpage', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/pointpage', {
			templateUrl: 'app/pointpage/pointpage.html',
			controller: ''  //Add a controller here later if we need it
		});
	}])

/*Function to see if the value is 0 or the maximum allowed,
if so fade the buttons and disable them*/
function fadeButton(id, pressedBtn) {

	var classLoc = (pressedBtn.className).split(" ")[0];

	var numberOfThrows = parseInt(document.getElementById(id).textContent);
	console.log(numberOfThrows);

	if(document.getElementById(id).textContent > 0 && classLoc == "negButton"){
		document.getElementById(id).textContent = "" + (numberOfThrows - 1);
		pressedBtn.parentNode.parentNode.getElementsByClassName("posButton")[0].style.color = "rgba(0,255,0,0.2)";
	}
	else if(document.getElementById(id).textContent < 8 && classLoc == "posButton") {
		document.getElementById(id).textContent = "" + (numberOfThrows + 1);
		pressedBtn.parentNode.parentNode.getElementsByClassName("negButton")[0].style.color = "rgba(255,0,0,0.2)";
	}

	if(document.getElementById(id).textContent == 0){
		pressedBtn.style.color = "rgba(191,191,191,0.2)";
	}
	else if(document.getElementById(id).textContent == 8){
		pressedBtn.style.color = "rgba(191,191,191,0.2)";
	}
}
