'use strict';

angular.module('shufabeitie.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.faties = [];
    $http.get('/', {cache: true}).success(function(data) {
        $scope.faties = data;
    });
}]);
