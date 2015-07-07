( function() {

		angular.module('app').service('logger', BadgeBase);

		function BadgeLogger() {

		}


		BadgeLogger.prototype.output = function(message) {
			console.log("Logged : " + message);
		};

		function BadgeBase() {

			this.name = "Badge Base";
			this.log = function() {
				console.log("Logger is initiated!");
			};
		}


		BadgeBase.prototype = Object.create(BadgeLogger.prototype);
	}());
