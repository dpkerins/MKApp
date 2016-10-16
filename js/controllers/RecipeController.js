app.controller('RecipeController', ['$scope', '$stateParams', '$firebaseArray', function($scope, $stateParams, $firebaseArray){
	var ref = firebase.database().ref('Recipes/');


	$scope.recipes = $firebaseArray(ref);
	$scope.recipes.$loaded()
		.then(function(){
			var key = $stateParams.id;
			$scope.currentRecipe = $scope.recipes.$getRecord(key);
			$scope.recipeCommentList = $firebaseArray(ref.child(key).child('Comments'));
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