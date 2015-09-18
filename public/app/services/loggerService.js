( function() {

		angular.module('app').service('logger', BadgeBase);

		function LoggerBase() {
			console.log();
		}


		LoggerBase.prototype.output = function(message) {
			console.log("Logged : " + message);
		};

		function BadgeBase() {
			LoggerBase.call(this);
			this.name = "Badge Base";
			this.log = function() {
				console.log("Logger is initiated!");
			};
		}


		BadgeBase.prototype = Object.create(LoggerBase.prototype);
	}());
