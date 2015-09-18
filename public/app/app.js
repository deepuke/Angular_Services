( function() {
		var app = angular.module('app', ['ngRoute']);

		app.provider('books', ["constants",
		function(constants) {
			this.$get = function() {
				var appName = constants.APP_TITLE,
				    appDesc = constants.APP_DESCRIPTION,
				    version = constants.APP_VERSION;

				if (includeVersionInTitle) {
					appName += " " + version;
				}

				return {
					appName : appName,
					appDesc : appDesc
				};
			};

			var includeVersionInTitle = false;
			this.setIncludeVersionInTitle = function(value) {
				includeVersionInTitle = value;
			};
		}]);

		app.config(['booksProvider', '$routeProvider',
		function(booksProvider, $routeProvider) {
			booksProvider.setIncludeVersionInTitle(true);

			$routeProvider.when('/', {
				templateUrl : '/app/templates/home.html',
				controller : 'BooksController',
				controllerAs : 'book'
			}).when('/addBook', {
				templateUrl : '/app/templates/addBook.html',
				controller : 'AddBookController',
				controllerAs : 'ctrl'
			}).otherwise('/');
		}]);

	}());
