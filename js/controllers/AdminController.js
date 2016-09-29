app.controller('AdminController', ['$scope', '$firebaseObject', '$firebaseAuth', '$firebaseArray', '$compile', function($scope, $firebaseObject, $firebaseAuth, $firebaseArray, $compile){
	var ref = firebase.database().ref();
	var firebaseProjects = firebase.database().ref('projects');

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

	$scope.obj = $firebaseObject(ref);
	var postList = $firebaseArray(ref.child('Posts'));
	var recipeList = $firebaseArray(ref.child('Recipes'));

	$scope.showPostAdder = false;
	$scope.appendPost = function(){
		$scope.showPostAdder = true;
		var todayDate = new Date();
		$scope.postDate = todayDate;
	};

	$scope.saveNewPost = function() {
		$firebaseArray(ref).$save('Posts');
		var newPostObject = {
			'Title' : $scope.postTitle,
			'Date' : $scope.postDate,
			'Content' : $scope.postContent,
			'ImageSource' : $scope.postImageSource
		};
		postList.$add(newPostObject);
		$scope.postTitle = null;
		$scope.postDate = null;
		$scope.postContent = null;
		$scope.postImageSource = null;
		$scope.showPostAdder = false;
	};

	$scope.showRecipeAdder = false;
	$scope.appendRecipe = function(){
		$scope.showRecipeAdder = true;
	};

	$scope.saveNewRecipe = function() {
		$firebaseArray(ref).$save('Recipes');
		var newRecipeObject = {
			'Title' : $scope.recipeTitle,
			'Content' : $scope.recipeContent,
			'ImageSource' : $scope.recipeImageSource
		};
		recipeList.$add(newRecipeObject);
		$scope.recipeTitle = null;
		$scope.recipeContent = null;
		$scope.recipeImageSource = null;
		$scope.showRecipeAdder = false;
	};




































}]);