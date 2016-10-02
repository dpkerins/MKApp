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


	$scope.adminWelcome = false;
	$scope.adminPersonal = false;
	$scope.adminBlog = true;
	$scope.adminRecipes = false;
	$scope.adminHeader = "Blog";

	$scope.showAdminWelcome = function(){
		$scope.adminWelcome = true;
		$scope.adminPersonal = false;
		$scope.adminBlog = false;
		$scope.adminRecipes = false;
		$scope.adminHeader = "Welcome Page";
	}
	$scope.showAdminPersonal = function(){
		$scope.adminWelcome = false;
		$scope.adminPersonal = true;
		$scope.adminBlog = false;
		$scope.adminRecipes = false;
		$scope.adminHeader = "Personal Info";
	}
	$scope.showAdminBlog = function(){
		$scope.adminWelcome = false;
		$scope.adminPersonal = false;
		$scope.adminBlog = true;
		$scope.adminRecipes = false;
		$scope.adminHeader = "Blog";
	}
	$scope.showAdminRecipes = function(){
		$scope.adminWelcome = false;
		$scope.adminPersonal = false;
		$scope.adminBlog = false;
		$scope.adminRecipes = true;
		$scope.adminHeader = "Recipes";
	}












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
		$scope.recipeTitle = "";
		$scope.recipeContent = "";
		$scope.recipeImageSource = "";
		$scope.showRecipeAdder = false;
	};


	var storage = firebase.storage();
	var storageRef = storage.ref();
	var mediaLibrary = storageRef.child('media');

	$scope.uploadNewPostMedia = function(){
		var previewImage = document.getElementById('post-preview-image');

		var uploadRef;

		var fileName = document.getElementById('file-name').value;
		var fileUpload = document.getElementById('theFile');
		var file = fileUpload.files[0];

		imageRef = mediaLibrary.child(fileName);
		imageRef.put(file).then(function(snapshot){
			uploadRef = imageRef.getDownloadURL().then(function(url){
				$scope.postImageSource = url;
				previewImage.src = url;
			});
		});
	}

	$scope.uploadNewRecipeMedia = function(){
		var previewImage = document.getElementById('post-preview-image');

		var uploadRef;

		var fileName = document.getElementById('file-name').value;
		var fileUpload = document.getElementById('theFile');
		var file = fileUpload.files[0];

		imageRef = mediaLibrary.child(fileName);
		imageRef.put(file).then(function(snapshot){
			uploadRef = imageRef.getDownloadURL().then(function(url){
				$scope.recipeImageSource = url;
				previewImage.src = url;
			});
		});
	}



































}]);