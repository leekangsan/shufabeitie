'use strict';

angular.module('shufabeitie.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.faties = [];
    $scope.search = function() {
        if ($scope.keywords) {
            // cache – {boolean|Cache} – If true, a default $http cache will be used to cache the GET request, NOT FOR POST request.
            $http.post('/search', {keywords: $scope.keywords}).success(function(data) {
                $scope.faties = data;
            });
        }
    };
}]);
