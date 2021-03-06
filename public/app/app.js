(function () {
    var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']);

    app.provider('books', ['constants',
		function (constants) {
            this.$get = function () {
                var appName = constants.APP_TITLE,
                    appDesc = constants.APP_DESCRIPTION,
                    version = constants.APP_VERSION;

                if (includeVersionInTitle) {
                    appName += ' ' + version;
                }

                return {
                    appName: appName,
                    appDesc: appDesc
                };
            };

            var includeVersionInTitle = false;
            this.setIncludeVersionInTitle = function (value) {
                includeVersionInTitle = value;
            };
		}]);

    app.config(['booksProvider', '$routeProvider', '$logProvider', '$httpProvider',
		function (booksProvider, $routeProvider, $logProvider, $httpProvider) {

            $logProvider.debugEnabled(false);
            booksProvider.setIncludeVersionInTitle(true);
            //$httpProvider.interceptors.push('bookLoggerInterceptor');

            $routeProvider.when('/', {
                templateUrl: 'app/templates/books.html',
                controller: 'BooksController',
                controllerAs: 'books'

            }).when('/addBook', {
                templateUrl: 'app/templates/addBook.html',
                controller: 'AddBookController',
                controllerAs: 'ctrl'

            }).when('/editBook/:bookId', {
                templateUrl: 'app/templates/editBook.html',
                controller: 'EditBookController',
                controllerAs: 'editBook'
            }).otherwise('/');
		}]);

    app.run(['$rootScope',
		function ($rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                console.log('Successfully changed routes');
            });
		}]);

}());
