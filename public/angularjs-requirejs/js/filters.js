'use strict';

/* Filters */

define(['angular'], function(angular) {
    angular.module('shufabeitie.filters', []).filter('beitie', function() {
        return function(input) {
            return input;
        };
    });
});
