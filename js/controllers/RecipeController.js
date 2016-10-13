app.controller('RecipeController', ['$scope', '$routeParams', '$firebaseArray', function($scope, $routeParams, $firebaseArray){
	var index = Number($routeParams.id);
	var ref = firebase.database().ref('Recipes/');


	$scope.recipes = $firebaseArray(ref);
	$scope.recipes.$loaded()
		.then(function(){
			key = $scope.recipes.$keyAt(index);
			$scope.currentRecipe = $scope.recipes.$getRecord(key);
			$scope.recipeCommentList = $firebaseArray(ref.child(key).child('Recipes'));
			$scope.submitPostComment = function(){
				var newRecipeMessage = document.getElementById('recipe-comment-message').value;
				var newRecipeName = document.getElementById('recipe-comment-name').value;
				var newRecipeDate = new Date();
				var newerCommentDate = newRecipeDate.toJSON();
				var newRecipeObject = {
					'Name': newRecipeName,
					'Message': newRecipeMessage,
					'Date' : newerCommentDate
				};
				$scope.recipeCommentList.$add(newRecipeObject);
				newRecipeMessage = "";
				newRecipeName = "";
			}
		});	
}]);