( function() {
		angular.module('app').controller('EditBookController', EditBookController);

		EditBookController.$inject = ['$routeParams', 'books'];

		function EditBookController($routeParams, books) {
			console.log('EditBookController initiated!');

			var vm = this;

			vm.currentBook = books.filter(function(item){
			return item.id == $routeParams.bookID;
			})[0];

		}

	}());
