app.controller('BlogPostController', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', function($scope, $stateParams, $firebaseArray, $firebaseObject){
	$scope.sidebarRecipes = $firebaseObject(firebase.database().ref('Recipes/'));	

	var ref = firebase.database().ref('Posts/');


	$scope.posts = $firebaseArray(ref);
	$scope.posts.$loaded()
		.then(function(){
			var key = $stateParams.id;
			$scope.currentPost = $scope.posts.$getRecord(key);
			$scope.postCommentList = $firebaseArray(ref.child(key).child('Comments'));
			document.getElementById('post-content-div').innerHTML = $scope.currentPost.Content;
			$scope.submitPostComment = function(){
				var newCommentMessage = document.getElementById('post-comment-message').value;
				var newCommentName = document.getElementById('post-comment-name').value;
				var newCommentDate = new Date();
				var newerCommentDate = newCommentDate.toJSON();
				var newCommentObject = {
					'Name': newCommentName,
					'Message': newCommentMessage,
					'Date' : newerCommentDate
				};
				$scope.postCommentList.$add(newCommentObject);
				newCommentMessage = "";
				newCommentName = "";
			}
		});	

	
	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));	
	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);	
}]);