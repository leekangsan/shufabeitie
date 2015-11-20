'use strict';

// 在angularjs中项目中引入requirejs的作用并不是很大
define(['angular', 'angularRoute', 'home/home', 'authors/authors', 'faties/faties', 'search/search', 'show/show', 'js/filters'], function(angular, route) {
    // Declare app level module which depends on views, and components
    angular.module('shufabeitie', [
        'ngRoute',
        'shufabeitie.home',
        'shufabeitie.authors',
        'shufabeitie.faties',
        'shufabeitie.show',
        'shufabeitie.search',
        'shufabeitie.filters'
    ]).config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ]).controller('NavbarCtrl', ['$scope',
        function($scope) {
            $scope.navClick = function() {
                $('#navbar-collapse').removeClass('in');
            };
        }
    ]);
});
