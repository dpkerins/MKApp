app.controller('MainController', ['$scope', '$firebaseObject', '$window', '$document', function($scope, $firebaseObject, $window, $document){
	var ref = firebase.database().ref('WelcomePage/');
	$scope.welcomePage = $firebaseObject(ref);
}]);