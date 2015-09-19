( function() {
		var app = angular.module('app', ['ngRoute', 'ngCookies']);

		app.provider('books', ["constants",
		function(constants) {
			this.$get = function() {
				var appName = constants.APP_TITLE, appDesc = constants.APP_DESCRIPTION, version = constants.APP_VERSION;

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
				templateUrl : 'app/templates/books.html',
				controller : 'BooksController',
				controllerAs : 'books'

			}).when('/addBook', {
				templateUrl : 'app/templates/addBook.html',
				controller : 'AddBookController',
				controllerAs : 'ctrl'

			}).when('/editBook/:bookID', {
				templateUrl : 'app/templates/editBook.html',
				controller : 'EditBookController',
				controllerAs : 'editBook',
				resolve : {
					books : function(dataService) {
						return dataService.getAllBooks();
					}
				}
			}).otherwise('/');
		}]);

		app.run(['$rootScope',
		function($rootScope) {
			$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
				console.log('Successfully changed routes');
			});
		}]);

	}());
