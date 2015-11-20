'use strict';

define(['angular'], function(angular) {
    angular.module('shufabeitie.faties', ['ngRoute'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/shufa/:author', {
                templateUrl: 'faties/faties.html',
                controller: 'FatiesCtrl'
            });
        }
    ])

    .controller('FatiesCtrl', ['$scope', '$http', '$routeParams',
        function($scope, $http, $routeParams) {
            $scope.author = $routeParams.author;
            $scope.faties = [];
            var url = ['/shufa/', $routeParams.author, '/'].join('');
            $http.get(url, { cache: true }).success(function(data) {
                $scope.faties = data;
            });
        }
    ]);
});