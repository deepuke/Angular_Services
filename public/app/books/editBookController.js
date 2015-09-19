( function() {
		angular.module('app').controller('EditBookController', EditBookController);

		EditBookController.$inject = ['$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location'];

		function EditBookController($routeParams, books, $cookies, $cookieStore, dataService, $log, $location) {
			console.log('EditBookController initiated!');

			var vm = this;
			dataService.getBookByID($routeParams.bookID).then(getBookSuccess).catch(getBookError);
			
			function getBookSuccess(book){
				vm.currentBook = book;
				$cookieStore.put('lastEdited', vm.currentBook);
			}

			function getBookError(error){
				$log.error(error);
			}

			vm.setAsFavorite = function() {
				$cookies.favoriteBook = vm.currentBook.title;
			}
			
			vm.update = function(){
				console.log(vm.currentBook);
				dataService.updateBook(vm.currentBook).then(updateBookSucess).catch(updateBookError);
			}
			function updateBookSucess(message){
				$log.log(message);
				$location.path('/');
			}

			function updateBookError(errorMsg){
				$log.error(errorMsg);
			}
		}

	}());
