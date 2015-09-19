( function() {
		angular.module('app').controller('EditBookController', EditBookController);

		EditBookController.$inject = ['$routeParams', 'books', '$cookies', '$cookieStore'];

		function EditBookController($routeParams, books, $cookies, $cookieStore) {
			console.log('EditBookController initiated!');

			var vm = this;

			vm.currentBook = books.filter(function(item){
			return item.id == $routeParams.bookID;
			})[0];

			vm.setAsFavorite = function() {
				$cookies.favoriteBook = vm.currentBook.title;
			}
			
			$cookieStore.put('lastEdited', vm.currentBook);
		}

	}());
