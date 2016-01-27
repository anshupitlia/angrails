angular.module('flapperNews', ['ui.router'])
.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl'
		})
		.state('posts', {
		  url: '/posts/{id}',
		  templateUrl: '/posts.html',
		  controller: 'PostsCtrl'
		});
		$urlRouterProvider.otherwise('home')
	}])
.factory(
	'posts', [function(){
		var o = {
			posts: [{title: 'post 1', upvotes: 5, comments: ["comment 1"]},
		{title: 'post 2', upvotes: 2, comments: ["comment 2"]},
		{title: 'post 3', upvotes: 15, comments: ["comment 3"]},
		{title: 'post 4', upvotes: 9, comments: ["comment 4"]},
		{title: 'post 5', upvotes: 4, comments: ["comment 5"]}]
		};
		return o;
	}]
	)
.controller('MainCtrl', [
	'$scope',
	'posts',
	function($scope, posts){
		$scope.posts = posts.posts;
		$scope.test = 'Hello World';

		$scope.addPost = function(){
			if(!$scope.title || $scope.title === '') { return; }
			$scope.posts.push({
				title: $scope.title, 
				upvotes: 0,
				link: $scope.link,
				comments: [
				    {author: 'Joe', body: 'Cool post!', upvotes: 0},
				    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
				  ]
			});
			$scope.link = '';
			$scope.title = '';
		};

		$scope.incrementUpvotes = function(post) {
			post.upvotes += 1;
		};

	}
	])
	.controller('PostsCtrl', [
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];

		$scope.addComment = function(){
		  if($scope.body === '') { return; }
		  $scope.post.comments.push({
		    body: $scope.body,
		    author: 'user',
		    upvotes: 0
		  });
		  $scope.body = '';
		};
	}]);