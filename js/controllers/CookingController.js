app.controller('CookingController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var recipeRef = firebase.database().ref('Recipes/');
	$scope.recipes = $firebaseArray(recipeRef);
}]);