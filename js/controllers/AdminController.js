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
	var portfolioList = $firebaseArray(ref.child('Portfolio'));
	var schoolList = $firebaseArray(ref.child('Resume/Education'));
	var jobList = $firebaseArray(ref.child('Resume/Work'));

	$scope.showJobAdder = false;
	$scope.appendJob = function(){
		$scope.showJobAdder = true;
	};

	$scope.showSchoolAdder = false;
	$scope.appendSchool = function() {
		$scope.showSchoolAdder = true;
	};

	$scope.showProjectAdder = false;
	$scope.appendProject = function() {
		$scope.showProjectAdder = true;
	};

	$scope.saveNewJob = function() {
		$firebaseArray(ref).$save('Work');
		var newJobObject = {
			'Title' : $scope.jobtitle,
			'Company' : $scope.jobcompany,
			'Place' : $scope.jobplace,
			'Description' : $scope.jobdescription
		};
		jobList.$add(newJobObject);
		$scope.jobtitle = null;
		$scope.jobcompany = null;
		$scope.jobplace = null;
		$scope.jobdescription = null;
		$scope.showJobAdder = false;
	};


	$scope.saveNewProject = function() {
		$firebaseArray(ref).$save('Portfolio');
		var newProjectObject = {
			'Client' : $scope.projectclient,
			'ImageSource' : $scope.projectimage,
			'Long_Summary' : $scope.projectlongsummary,
			'Name' : $scope.projectname,
			'Short_Summary' : $scope.projectshortsummary
		};
		portfolioList.$add(newProjectObject);
		$scope.projectshortsummary = null;
		$scope.projectlongsummary = null;
		$scope.projectimage = null;
		$scope.projectclient = null;
		$scope.projectname = null;
		$scope.showProjectAdder = false;
	};

	$scope.schoolgrade = null;
	$scope.schoolactivities = null;
	$scope.schooldescription = null;

	$scope.saveNewSchool = function() {
		$firebaseArray(ref).$save('Education');
		var newSchoolObject = {
			'Name' : $scope.schoolname,
			'Start' : $scope.schoolstart,
			'End' : $scope.schoolend,
			'Degree' : $scope.schooldegree,
			'Field' : $scope.schoolfield,
			'Grade' : $scope.schoolgrade,
 			'Activities' : $scope.schoolactivities,
			'Description' : $scope.schooldescription
		};
		schoolList.$add(newSchoolObject);
		$scope.schoolname = null;
		$scope.schoolstart = null;
		$scope.schoolend = null;
		$scope.schooldegree = null;
		$scope.schoolfield = null;
		$scope.schoolgrade = null;
		$scope.schoolactivities = null;
		$scope.schooldescription = null;
		$scope.showSchoolAdder = false;
	};


































}]);