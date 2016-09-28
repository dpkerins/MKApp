app.factory('new_project', function(){
	return 
		"<div class="project-section">" +
			"Project Name: <input ng-model="project.Name" type="text" class="project-input"></input><br><br>" +
			"Image Source: <input ng-model="project.ImageSource" type="text" class="project-input"></input><br><br>" +
			"Client Name: <input ng-model="project.Client" type="text" class="project-input"></input><br><br>" +
			"Short Summary: <input ng-model="project.Short_Summary" type="text" class="project-input"></input><br><br>" +
			"Long Summary: <input ng-model="project.Long_Summary" type="text" class="project-input"></input><br><br><br><br>" +
			"<button class="save-new-project">SAVE NEW PORJECT</button>" +
		"</div>";
});