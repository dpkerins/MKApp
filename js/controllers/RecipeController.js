app.controller('RecipeController', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', function($scope, $stateParams, $firebaseArray, $firebaseObject){
	$scope.sidebarRecipes = $firebaseObject(firebase.database().ref('Recipes/'));

	var ref = firebase.database().ref('Recipes/');

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));
	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);


	$scope.recipes = $firebaseArray(ref);
	$scope.recipes.$loaded()
		.then(function(){
			var key = $stateParams.id;
			$scope.currentRecipe = $scope.recipes.$getRecord(key);
			$scope.recipeCommentList = $firebaseArray(ref.child(key).child('Comments'));
			document.getElementById('recipe-content-div').innerHTML = $scope.currentRecipe.Content;
			$scope.submitRecipeComment = function(){
				var newCommentMessage = document.getElementById('recipe-comment-message').value;
				var newCommentName = document.getElementById('recipe-comment-name').value;
				var newCommentDate = new Date();
				var newerCommentDate = newCommentDate.toJSON();
				var newCommentObject = {
					'Name': newCommentName,
					'Message': newCommentMessage,
					'Date' : newerCommentDate
				};
				$scope.recipeCommentList.$add(newCommentObject);
				newCommentMessage = "";
				newCommentName = "";
			}
		});	
}]);