app.component('blog', {
	template: '<div class="main-container"></div>'
'<div appheader class="main-header"></div>'
'<div class="main-content">'
	'<div class="blog-main-content">'
		'<div ng-repeat="post in posts | filter: blogSearch | orderBy:'Date':true" class="post-div">'
			'<div class="post-div-image" style="background: url('{{ post.ImageSource }}'); background-position: center; background-size: cover"></div>'	
			'<div class="post-info">'
				'<h3>{{ post.Title}}</h3>'
				'<h4>{{ post.Date | date : 'short' }}</h4>'
				'<p>{{ post.Content | limitTo: 200 }}{{post.Content.length > 200 ? '...' : ''}}</p>'
				'<a ui-sref="blog-post({id: post.Id })">'
					'<h4>Read More...</h4>'
				'</a>'
			'</div>'
		'</div>'
	'</div>'
	<div class="sidebar">
		<div class="inner-sidebar">
			<div class="social-links">
				<a href="https://www.instagram.com/diggerous/" target="_blank"><img class="social-pic" src="img/Instagram_Logo.png"></a>
				<a href="https://twitter.com/douglaskerins" target="_blank"><img class="social-pic" src="img/Twitter_Logo.png"></a>
			</div>
			Search Blog Entries: <input type="text" ng-model="blogSearch"></input>
		</div>
	</div>
</div>




'
})