app.controller('MainController', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject){
	$scope.sidebarRecipes = $firebaseObject(firebase.database().ref('Recipes/'));	

	var ref = firebase.database().ref('WelcomePage/');
	$scope.welcomePage = $firebaseArray(ref);
	$scope.blogArray = $firebaseArray(firebase.database().ref('Posts/'));
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));

	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);
	
}]);