( function() {
		'user strict';

		angular.module('app').factory('BooksResource', BooksResource);
		BooksResource.$inject = ['$resource'];
		function BooksResource($resource) {
			return $resource('http://localhost:8090/api/books/:bookId', {
				bookId : '@_id'
			}, {
				'update' : {
					method : 'PUT'
				}
			});
		}

	}());
