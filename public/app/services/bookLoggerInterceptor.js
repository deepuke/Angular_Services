( function() {'use strict';

		angular.module('app').factory('bookLoggerInterceptor', bookLoggerInterceptor);

		bookLoggerInterceptor.$inject = ['$q', '$log'];

		function bookLoggerInterceptor($q, $log) {

			function requestInterceptor(config) {
				$log.debug('HTTP' + config.method + 'request - ' + config.url);
			}

			/*
			 function responseErrorInterceptor(response){
			 $log.debug('HTTP' + response.config.method + 'request error- '+ response.config);
			 $q.reject(response);
			 }
			 */

			return {
				request : requestInterceptor
				//responseError : responseErrorInterceptor
			};
		}

	}());
