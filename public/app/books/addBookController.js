( function() {
		angular.module('app').controller('AddBookController', AddBookController);
		AddBookController.$inject = ['$log', '$location', 'dataService']
		function AddBookController($log, $location, dataService) {
			console.log('Initiated AddBookController');
			
			var vm = this;
			vm.newBook = {};
			
			vm.addBook = function(){
				dataService.addBook(vm.newBook).then(addBookSuccess).catch(addBookError);
			};
			
			function addBookSuccess(message){
				$log.log(message);
				$location.path('/');
			}
			
			function addBookError(message){
				$log.error(message);
			}
		}

	}());
