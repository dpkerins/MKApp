app.controller('AboutMeController', ['$scope', '$firebaseObject', function($scope, $firebaseObject){
	var ref = firebase.database().ref('AboutMe/PersonalInfo/');
	$scope.aboutMe = $firebaseObject(ref);
	$scope.fullName = $scope.aboutMe.firstName + " " + $scope.aboutMe.lastname;
}]);