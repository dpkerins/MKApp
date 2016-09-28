app.controller('RecipeController', ['$scope', '$routeParams', '$firebaseArray', function($scope, $routeParams, $firebaseArray){
	var index = Number($routeParams.id);
	var ref = firebase.database().ref('Recipes/');
	$scope.recipes = $firebaseArray(ref);
	$scope.recipes.$loaded()
		.then(function(){
			key = $scope.recipes.$keyAt(index);
			$scope.currentRecipe = $scope.recipes.$getRecord(key);
		});
}]);