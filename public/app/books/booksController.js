( function() {
		angular.module('app').controller('BooksController', BooksController);
		
		BooksController.$inject = ["books", "dataService", "logger", "badgeService", "$q"];
		
		function BooksController(books, dataService, logger, badgeService, $q) {
			var vm = this,
			    bookPromise = dataService.getAllBooks(),
			    readerPromise = dataService.getAllReaders();

			$q.all([bookPromise, readerPromise]).then(function(result) {
				vm.allBooks = result[0];
				vm.allReaders = result[1];
			}).catch(errorCallback).finally(completeCallback);

			function errorCallback(errMsg) {
				console.log(errMsg);
			}

			function completeCallback() {
				console.log("All promise has competed");
			}

			vm.appName = books.appName;
			vm.getBadge = badgeService.retrieveBadge;
		}

	}());
