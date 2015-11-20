'use strict';

define(['angular'], function(angular) {
    angular.module('shufabeitie.home', ['ngRoute'])

    .config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl'
            });
        }
    ])

    .controller('HomeCtrl', ['$scope', '$http', '$injector',
        function($scope, $http, $injector) {
            $scope.faties = [];
            // We can load the controller only when needed from an external file
            require(['home/controller'], function(ctrl) {
                // injector method takes an array of modules as the first argument
                // if you want your controller to be able to use components from
                // any of your other modules, make sure you include it together with 'ng'
                // Furthermore we need to pass on the $scope as it's unique to this controller
                $injector.invoke(ctrl, this, {'$scope': $scope});
            });
        }
    ]);
});
