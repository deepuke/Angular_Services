( function() {

		angular.module('app').controller('BooksController', BooksController);

		BooksController.$inject = ['books', 'dataService', 'logger', 'badgeService', '$q', '$cookies', '$cookieStore', '$log', '$route', 'BooksResource'];

		function BooksController(books, dataService, logger, badgeService, $q, $cookies, $cookieStore, $log, $route, BooksResource) {
			var vm = this;

			//dataService.getAllBooks().then(getBookSuccess).catch(errorCallback);

			vm.allBooks = BooksResource.query();
			function getBookSuccess(books) {
				console.log(books);
				vm.allBooks = books;
			}


			dataService.getAllReaders().then(getReaderSuccss).catch(errorCallback);
			function getReaderSuccss(readers) {
				vm.allReaders = readers;
			}


			vm.deleteBook = function(bookID) {

				dataService.deleteBook(bookID).then(deleteBookSuccess).catch(errorCallback);
			};
			function deleteBookSuccess(msg) {
				$log.info('msg');
				$route.reload();
			}

			function errorCallback(errMsg) {
				console.log(errMsg);
			}

			function completeCallback() {
				console.log('All promise has competed');
			}


			vm.appName = books.appName;
			vm.getBadge = badgeService.retrieveBadge;

			vm.favoriteBook = $cookies.favoriteBook;

			vm.lastEditedBook = $cookieStore.get('lastEdited');

			/*
			 $log.log('logging with log');
			 $log.info('logging with info');
			 $log.warn('logging with warn');
			 $log.error('logging with error');
			 $log.debug('logging with debug');*/

		}

	}());
