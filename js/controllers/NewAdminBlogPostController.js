app.controller('NewAdminBlogPostController', ['$scope', '$firebaseArray', '$firebaseAuth', function($scope, $firebaseArray, $firebaseAuth){
	var ref = firebase.database().ref();
	var postRef = firebase.database().ref('Posts');



	
	
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

	var todayDate = (new Date()).toJSON()
	$scope.postDate = todayDate;

	$scope.saveNewPost = function() {
		// check for image file and add placeholder if none found //
		if (!$scope.postImageSource){
			$scope.postImageSource = "../../img/placeholder_image.jpg"
		}

		var urlID = $scope.postTitle.replace(' ', '');

		$firebaseArray(ref).$save('Posts');
		var newPostObject = {
			'Title' : $scope.postTitle,
			'Date' : $scope.postDate,
			'Content' : $scope.postContent,
			'ImageSource' : $scope.postImageSource
		};
		postList.$add(newPostObject).then(function(ref){
			var id = ref.key;
			var arrayLocation = postList.$indexFor(id);
			postList[arrayLocation].urlID = id;
			postList.$save(arrayLocation);
		})

		$firebaseArray(ref).$save('Posts');
		$scope.postTitle = "";
		$scope.postDate = todayDate;
		$scope.postContent = "";
		$scope.postImageSource = "";
		$scope.showPostAdder = false;
		var newPreviewImage = document.getElementById('post-preview-image');
		newPreviewImage.src = "../../img/placeholder_image.jpg";
	};

	var storage = firebase.storage();
	var storageRef = storage.ref();
	var mediaLibrary = storageRef.child('media');

	$scope.uploadNewPostMedia = function(){
		var previewImage = document.getElementById('post-preview-image');

		var uploadRef;

		var fileName = document.getElementById('post-file-name').value;
		var fileUpload = document.getElementById('post-image-file');
		var file = fileUpload.files[0];

		imageRef = mediaLibrary.child(fileName);
		imageRef.put(file).then(function(snapshot){
			uploadRef = imageRef.getDownloadURL().then(function(url){
				$scope.postImageSource = url;
				previewImage.src = url;
			});
		});
	}

}]);