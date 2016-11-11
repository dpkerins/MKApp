app.controller('BlogController', ['$scope', '$firebaseArray', '$firebaseObject', function($scope, $firebaseArray, $firebaseObject){
	$scope.sidebarRecipes = $firebaseObject(firebase.database().ref('Recipes/'));	

	var postRef = firebase.database().ref('Posts/');
	$scope.posts = $firebaseArray(postRef);

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));

	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);


}]);