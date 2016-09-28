app.controller('CookingController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
	var ref = firebase.database().ref('Recipes/');
	$scope.recipes = $firebaseObject(ref);
}]);