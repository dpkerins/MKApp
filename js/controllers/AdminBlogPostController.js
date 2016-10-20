app.controller('AdminBlogPostController', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$firebaseAuth', function($scope, $stateParams, $firebaseArray, $firebaseObject, $firebaseAuth){
	var postsRef = firebase.database().ref('Posts');
	var postsObject = $firebaseObject(postsRef);	
	

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




	var index = Number($stateParams.id);
	var ref = firebase.database().ref('Posts/');
	$scope.posts = $firebaseArray(ref);
	$scope.posts.$loaded()
		.then(function(){
			var key = $scope.posts.$keyAt(index);
			$scope.currentPost = $scope.posts.$getRecord(key);
			console.log($scope.currentPost.Content);

			$scope.savePost = function(){
				postsObject[key] = $scope.currentPost;
				postsObject.$save();
			};
		});


}]);


















