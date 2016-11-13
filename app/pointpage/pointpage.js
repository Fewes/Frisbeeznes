angular.module('myApp.pointpage', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/pointpage', {
			templateUrl: 'app/pointpage/pointpage.html',
			controller: ''  //Add a controller here later if we need it
		});
	}])

/*Function to see if the value is 0 or the maximum allowed,
if so fade the buttons and disable them*/
function fadeButton() {

}
