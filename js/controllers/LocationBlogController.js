app.controller('LocationBlogController', ['$scope', '$stateParams', '$firebaseArray', function($scope, $stateParams, $firebaseArray){
	var ref = firebase.database().ref('Posts/');

	$scope.posts = $firebaseArray(ref);
	$scope.location = $stateParams.id;

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));

	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);

}]);