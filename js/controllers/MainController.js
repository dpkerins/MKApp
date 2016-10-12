app.controller('MainController', ['$scope', '$firebaseArray', '$window', '$document', function($scope, $firebaseArray, $window, $document){
	var ref = firebase.database().ref('WelcomePage/');
	$scope.welcomePage = $firebaseArray(ref);
	$scope.blogArray = $firebaseArray(firebase.database().ref('Posts/'));
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));
	
}]);