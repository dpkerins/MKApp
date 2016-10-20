app.controller('BlogController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var postRef = firebase.database().ref('Posts/');
	$scope.posts = $firebaseArray(postRef);

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));

	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);


}]);