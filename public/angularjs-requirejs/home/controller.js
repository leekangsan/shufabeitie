'use strict';

define(function() {
    return ['$http', '$scope', function($http, $scope) {
        // For mutations to be properly observed, you should make them only within the scope.$apply(). Angular APIs do this implicitly, so no extra $apply call is needed when doing synchronous work in controllers, or asynchronous work with $http, $timeout or $intervalservices.
        $http.get('/', { cache: true }).success(function(data) {
            $scope.faties = data;
        });
    }];
});
