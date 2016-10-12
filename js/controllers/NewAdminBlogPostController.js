app.controller('NewAdminBlogPostController', ['$scope', '$routeParams', '$firebaseArray', '$firebaseAuth', function($scope, $routeParams, $firebaseArray, $firebaseAuth){
	
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

	var postList = $firebaseArray(ref.child('Posts'));

	$scope.postDate = (new Date()).toJSON();

	$scope.saveNewPost = function() {
		// check for image file and add placeholder if none found //
		if (!$scope.postImageSource){
			$scope.postImageSource = "../../img/placeholder_image.jpg"
		}

		$firebaseArray(ref).$save('Posts');
		var newPostObject = {
			'Title' : $scope.postTitle,
			'Date' : $scope.postDate,
			'Content' : $scope.postContent,
			'ImageSource' : $scope.postImageSource
		};
		postList.$add(newPostObject);
		$scope.postTitle = "";
		$scope.postDate = "";
		$scope.postContent = "";
		$scope.postImageSource = "";
		$scope.showPostAdder = false;
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