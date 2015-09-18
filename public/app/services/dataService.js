( function() {
		angular.module('app').factory('dataService', dataService);

		dataService.$inject = ['$q', '$timeout', 'logger'];

		function dataService($q, $timeout, logger) {

			function getAllBooks() {
				logger.output("Get all books");
				var booksArray = [{
					id : 1,
					title : "Learn Node.JS",
					author : "Henry Mills",
					genre : "Non Fiction"
				}, {
					id : 2,
					title : "Angular JS for Absolute Beginners",
					author : "John Papa",
					genre : "Non Fiction"
				}, {
					id : 3,
					title : "Fundamentals of OOPs JavaScript",
					author : "O\'Relly",
					genre : "Non Fiction"
				},{
					id : 4,
					title : "100 Days of love",
					author : "Mark Antony",
					genre : "Fiction"
				}],
				    deferred = $q.defer();

				$timeout(function() {
					var successful = true;
					if (successful) {
						deferred.notify("Just getting started, gathering books...");
						deferred.notify("Almost done gathering books...");
						deferred.resolve(booksArray);
					} else {
						deferred.reject('Error retrieving books');
					}
				}, 1000);

				return deferred.promise;
			}

			function getAllReaders() {
				logger.output("Get all readers");
				var allReaders = [{
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
				}],
				    deferred = $q.defer();
				    
				$timeout(function() {
					var successful = true;

					if (successful) {
						deferred.notify("Almost done gathering readers...");
						deferred.resolve(allReaders);
					} else {
						deferred.reject("Error retrieving readers");
					}
				}, 1500);

				return deferred.promise;

			}

			return {
				getAllBooks : getAllBooks,
				getAllReaders : getAllReaders
			};

		}

	}());
