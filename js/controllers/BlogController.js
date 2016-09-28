app.controller('BlogController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
	var ref = firebase.database().ref('Posts/');
	$scope.posts = $firebaseObject(ref);
}]);