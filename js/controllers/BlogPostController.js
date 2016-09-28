app.controller('BlogPostController', ['$scope', '$routeParams', '$firebaseArray', function($scope, $routeParams, $firebaseArray){
	var index = Number($routeParams.id);
	var ref = firebase.database().ref('Posts/');
	$scope.posts = $firebaseArray(ref);
	$scope.posts.$loaded()
		.then(function(){
			key = $scope.posts.$keyAt(index);
			$scope.currentPost = $scope.posts.$getRecord(key);
		});
}]);