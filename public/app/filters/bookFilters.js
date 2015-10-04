(function () {
    'use strict';

    angular.module('app').filter('dateFilter', function () {
        return function (input) {
            return Date.parse(input);
        }
    });
}());
