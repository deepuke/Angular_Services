( function() {
		angular.module('app').controller('BooksController', ["books", "dataService", "logger", "badgeService", BooksController]);

		function BooksController(books, dataService, logger, badgeService) {
			var vm = this;
			vm.appName = books.appName;

			//vm.allBooks = dataService.getAllBooks();
			dataService.getAllBooks().then(getBooksSuccess, null, getBooksNotification).catch(errorCallback);
			function getBooksSuccess(books) {				
				vm.allBooks = books;
			}
			function errorCallback(errorMsg){
				console.log("Error Msg : "+ errorMsg);
			}	
			/*
			function getBooksError(reason) {
							console.log(reason);
						}
			*/
			
			function getBooksNotification(notification) {
				console.log("Promise Notification : " + notification);
			}


			vm.allReader = dataService.getAllReaders();

			vm.getBadge = badgeService.retrieveBadge;

			logger.output("Testing 123!");

			console.log(vm);

		}

	}());
