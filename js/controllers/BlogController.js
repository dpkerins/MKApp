app.controller('BlogController', ['$scope', '$firebaseArray', function($scope, $firebaseArray){
	var ref = firebase.database().ref('Posts/');
	$scope.posts = $firebaseArray(ref);

}]);