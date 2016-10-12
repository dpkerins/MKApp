app.controller('AdminBlogPostController', ['$scope', '$routeParams', '$firebaseArray', '$firebaseAuth', function($scope, $routeParams, $firebaseArray, $firebaseAuth){
	
	var authRef = $firebaseAuth();

	$scope.auth = authRef;
	$scope.auth.$onAuthStateChanged(function(authData) {
	  $scope.authData = authData;
	});

	$scope.authorize_password = function(){
		var email = angular.element(document.querySelector('.email-input')).val();
		var password = angular.element(document.querySelector('.password-input')).val();
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
	};

	$scope.logOut = function(){
		firebase.auth().signOut().then(function() {
			console.log("SIGNED OUT")
		  // Sign-out successful.
		}, function(error) {
			console.log(error);
		  // An error happened.
		});
	};







	var index = Number($routeParams.id);
	var ref = firebase.database().ref('Posts/');
	$scope.posts = $firebaseArray(ref);
	$scope.posts.$loaded()
		.then(function(){
			key = $scope.posts.$keyAt(index);
			$scope.currentPost = $scope.posts.$getRecord(key);
		});
}]);