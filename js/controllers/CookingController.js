app.controller('CookingController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var recipeRef = firebase.database().ref('Recipes/');
	$scope.recipes = $firebaseArray(recipeRef);

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));

	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);
}]);