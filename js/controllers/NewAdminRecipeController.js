app.controller('NewAdminRecipeController', ['$scope', '$firebaseArray', '$firebaseAuth', function($scope, $firebaseArray, $firebaseAuth){
	var ref = firebase.database().ref();
	var recipeRef = firebase.database().ref('Recipes');



	
	
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

	var recipeList = $firebaseArray(ref.child('Recipes'));

	var todayDate = (new Date()).toJSON()
	$scope.recipeDate = todayDate;

	$scope.saveNewRecipe = function() {
		// check for image file and add placeholder if none found //
		if (!$scope.recipeImageSource){
			$scope.recipeImageSource = "../../img/placeholder_image.jpg"
		}

		var urlID = $scope.recipeTitle.replace(' ', '');

		$firebaseArray(ref).$save('Recipes');
		var newRecipeObject = {
			'Title' : $scope.recipeTitle,
			'Date' : $scope.recipeDate,
			'Content' : $scope.recipeContent,
			'ImageSource' : $scope.recipeImageSource
		};
		recipeList.$add(newRecipeObject).then(function(ref){
			var id = ref.key;
			var arrayLocation = recipeList.$indexFor(id);
			recipeList[arrayLocation].urlID = id;
			recipeList.$save(arrayLocation);
		})

		$firebaseArray(ref).$save('Recipes');
		$scope.recipeTitle = "";
		$scope.recipeDate = todayDate;
		$scope.recipeContent = "";
		$scope.recipeImageSource = "";
		$scope.showRecipeAdder = false;
		var newPreviewImage = document.getElementById('recipe-preview-image');
		newPreviewImage.src = "../../img/placeholder_image.jpg";
	};

	var storage = firebase.storage();
	var storageRef = storage.ref();
	var mediaLibrary = storageRef.child('media');

	$scope.uploadNewRecipeMedia = function(){
		var previewImage = document.getElementById('recipe-preview-image');

		var uploadRef;

		var fileName = document.getElementById('recipe-file-name').value;
		var fileUpload = document.getElementById('recipe-image-file');
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