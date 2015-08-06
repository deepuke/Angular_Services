( function() {
		angular.module('app').factory('dataService', dataService);
	
		dataService.$inject = ['$q', '$timeout', 'logger'];

		function dataService($q, $timeout, logger) {
			return {
				getAllBooks : getAllBooks,
				getAllReaders : getAllReaders
			};

			function getAllBooks() {
				logger.output("Get all books");
				var booksArray = [{
					id : 1,
					title : "Learn Node.JS"
				}, {
					id : 2,
					title : "Angular JS for Absolute Beginners"
				}, {
					id : 3,
					title : "Fundamentals of OOPs JavaScript"
				}];

				var deferred = $q.defer();
				$timeout(function() {
					var successful = true;
					if(successful){
						deferred.notify("Just getting started, gathering books...");
						deferred.notify("Almost done gathering books...");
						deferred.resolve(booksArray);
					} else {
						deferred.reject('Error retrieving books');
					}
				}, 1500);

				return deferred.promise;
			}

			function getAllReaders() {
				logger.output("Get all readers");
				return [{
					id : 1,
					name : "Deepu",
					totalReadHours : 5001
				}, {
					id : 2,
					name : "Anoop",
					totalReadHours : 2578
				}, {
					id : 3,
					name : "Leena",
					totalReadHours : 500
				}];
			}

		}


		
	}());
