angular.module('myApp.pointpage', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/pointpage', {
			templateUrl: 'app/pointpage/pointpage.html',
			controller: 'mainCtrl'  //Add a controller here later if we need it
		});
	}])

/*Function to see if the value is 0 or the maximum allowed,
if so fade the buttons and disable them*/
function fadeButton(){

	var numberOfThrows = parseInt(document.getElementsByClassName('points').textContent);

	var neg = document.getElementsByClassName("negButton").className;
	var pos = document.getElementsByClassName("posButton").className;

	if(neg == 'negButton'){
		document.getElementsByClassName('points').textContent = numberOfThrows-1;
		alert(numberOfThrows);
	}
	else if (pos == 'posButton'){
		document.getElementsByClassName('points').textContent = numberOfThrows+1;
		alert(numberOfThrows);
	}


	if(numberOfThrows == 0){
		document.getElementsByClassName('negButton').style.color = '#123123';
		/*Disable button*/
	}
	else if(numberOfThrows > 0 && numberOfThrows < 8/*Max throws*/) {
		document.getElementsByClassName('negButton').style.color = '#101010';
		document.getElementsByClassName('posButton').style.color = '#414141';
	}
	else {
		document.getElementsByClassName('posButton').style.color = '#131313';
	}
	alert("hej");
}
