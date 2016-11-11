app.controller('AboutMeController', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray){
	$scope.sidebarRecipes = $firebaseObject(firebase.database().ref('Recipes/'));	

	var ref = firebase.database().ref('AboutMe/PersonalInfo/');
	$scope.aboutMe = $firebaseObject(ref);
	$scope.fullName = $scope.aboutMe.firstName + " " + $scope.aboutMe.lastname;

	
	$scope.recipeArray = $firebaseArray(firebase.database().ref('Recipes/'));
	
	var placeRef = firebase.database().ref('Locations/');
	$scope.locations = $firebaseArray(placeRef);
}]);