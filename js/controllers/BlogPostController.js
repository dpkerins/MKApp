app.controller('BlogPostController', ['$scope', '$routeParams', '$firebaseArray', function($scope, $routeParams, $firebaseArray){
	var index = Number($routeParams.id);
	var ref = firebase.database().ref('Posts/');


	$scope.posts = $firebaseArray(ref);
	$scope.posts.$loaded()
		.then(function(){
			key = $scope.posts.$keyAt(index);
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