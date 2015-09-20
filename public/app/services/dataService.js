( function() {
		angular.module('app').factory('dataService', dataService);

		dataService.$inject = ['$q', '$timeout', 'logger', '$http', 'constants'];

		function dataService($q, $timeout, logger, $http, constants) {

			function getAllBooks() {
				return $http({
				method : 'GET',
				url:'http://localhost:8090/api/books/',
				headers : {
				'XX-T2Head' : 'Deepu',
				'PS-BookLogger-Version' : constants.APP_VERSION
				},
				transformResponse : transformGetBooks,
				}).then(sendResponseData).catch(sendGetBooksError);
			}
			
			function transformGetBooks(data, headerGetter, status){
				var transformed = angular.fromJson(data);
				transformed.forEach(function(currentValue, index, array){
					currentValue.downLoaded = new Date();
				});
				return transformed;
			}

			function getBookByID(bookID) {
				return $http({
				method : 'GET',
				url:'http://localhost:8090/api/books/' + bookID,
				headers : {
				'XX-T2Head' : 'Deepu',
				'PS-BookLogger-Version' : constants.APP_VERSION
				}
				}).then(sendResponseData).catch(sendGetBooksError);
			}

			function sendResponseData(response) {
				return response.data;
			}

			function sendGetBooksError(response) {
				return $q.reject('Error in retrieving books, HTTP Status : ' + response.status);
			}

			function updateBook(book) {
				return $http({
				method : 'PUT',
				data:book,
				url:'http://localhost:8090/api/books/' + book._id,
				headers : {
				'XX-T2Head' : 'Deepu',
				'PS-BookLogger-Version' : constants.APP_VERSION
				}
				}).then(updateBookSuccess).catch(updateBookError);
			}

			function updateBookSuccess(response) {
				return 'Updated book : ' + response.config.data.title;
			}

			function updateBookError(response) {
				return $q.reject('Error in retrieving books, HTTP Status : ' + response.status);
			}

			function addBook(newBook) {
				return $http({
				method : 'POST',
				data:newBook,
				url:'http://localhost:8090/api/books/',
				headers : {
				'XX-T2Head' : 'Deepu',
				'PS-BookLogger-Version' : constants.APP_VERSION
				},
				transformRequest : transformPostReq,
				}).then(addBookSuccess).catch(addBookError);
			}
			
			function transformPostReq(data, headerGetter){
				data.newBook = true;
				console.log(data);
				return JSON.stringify(data);
			}
			
			function addBookSuccess(response) {
				return 'Added new book : ' + response.config.data.title;
			}

			function addBookError(response) {
				return $q.reject('Error in adding books, HTTP Status : ' + response.status);
			}

			function deleteBook(bookID) {
				return $http({
				method : 'DELETE',
				url : 'http://localhost:8090/api/books/'+bookID,
				headers : {
				'XX-T2Head' : 'Deepu',
				'PS-BookLogger-Version' : constants.APP_VERSION
				}
				}).then(deleteBookSuccess).catch(deleteBookError);
			}
			
			function deleteBookSuccess(response) {
				return 'Deleted book';
			}

			function deleteBookError(response) {
				return $q.reject('Error in adding books, HTTP Status : ' + response.status);
			}

			function getAllReaders() {
				logger.output('Get all readers');
				var allReaders = [{
					id : 1,
					name : 'Deepu',
					totalReadHours : 5001
				}, {
					id : 2,
					name : 'Anoop',
					totalReadHours : 2578
				}, {
					id : 3,
					name : 'Leena',
					totalReadHours : 500
				}], deferred = $q.defer();

				$timeout(function() {
					var successful = true;

					if (successful) {
						deferred.notify('Almost done gathering readers...');
						deferred.resolve(allReaders);
					} else {
						deferred.reject('Error retrieving readers');
					}
				}, 1500);

				return deferred.promise;

			}

			return {
				getAllBooks : getAllBooks,
				getBookByID : getBookByID,
				updateBook : updateBook,
				addBook : addBook,
				deleteBook: deleteBook,
				getAllReaders : getAllReaders
			};

		}

	}());
