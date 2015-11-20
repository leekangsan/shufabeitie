'use strict';

angular.module('shufabeitie.authors', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/authors', {
    templateUrl: 'authors/authors.html',
    controller: 'AuthorsCtrl'
  });
}])

.controller('AuthorsCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.authors = [];
    $http.get('/shufa/authors', {cache: true}).success(function(data) {
        $scope.authors = data;
    });
}]);
