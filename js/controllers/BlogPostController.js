app.controller('BlogPostController', ['$scope', '$stateParams', '$firebaseArray', function($scope, $stateParams, $firebaseArray){
	var ref = firebase.database().ref('Posts/');


	$scope.posts = $firebaseArray(ref);
	$scope.posts.$loaded()
		.then(function(){
			var key = $stateParams.id;
			$scope.currentPost = $scope.posts.$getRecord(key);
			$scope.postCommentList = $firebaseArray(ref.child(key).child('Comments'));
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
}]);