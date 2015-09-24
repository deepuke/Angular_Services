( function() {
		angular.module('app').controller('EditBookController', EditBookController);

		EditBookController.$inject = ['$q','$routeParams', 'books', '$cookies', '$cookieStore', 'dataService', '$log', '$location', 'BooksResource'];

		function EditBookController($q, $routeParams, books, $cookies, $cookieStore, dataService, $log, $location, BooksResource) {
			console.log('EditBookController initiated!');

			var vm = this;
			//dataService.getBookByID($routeParams.bookID).then(getBookSuccess).catch(getBookError);

			vm.currentBook = BooksResource.get({
				bookId : $routeParams.bookId
			});
			$log.log(vm.currentBook);

			function getBookSuccess(book) {
				vm.currentBook = book;
				$cookieStore.put('lastEdited', vm.currentBook);
			}

			function getBookError(error) {
				$log.error(error);
			}

			vm.setAsFavorite = function() {
				$cookies.favoriteBook = vm.currentBook.title;
			};

			vm.update = function() {
				/*
				 console.log(vm.currentBook);
				 dataService.updateBook(vm.currentBook).then(updateBookSucess).catch(updateBookError);*/
				var deffered = $q.defer();
				
				vm.currentBook.$update().then(function(result){
					$q.resolve(result);	
					$location.path('/');				
				}).catch(function(error){
					$q.reject(error);
					$location.path('/');
				});
				return deffered.promise;				
			};

			function updateBookSucess(message) {
				$log.log(message);
				$location.path('/');
			}

			function updateBookError(errorMsg) {
				$log.error(errorMsg);
			}

		}

	}());
