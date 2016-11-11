app.controller('CookingController', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject){
	$scope.sidebarRecipes = $firebaseObject(firebase.database().ref('Recipes/'));	

	var recipeRef = firebase.database().ref('Recipes/');
	$scope.recipes = $firebaseArray(recipeRef);

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));

	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);
}]);