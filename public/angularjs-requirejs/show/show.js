'use strict';

define(['angular'], function(angular) {
    angular.module('shufabeitie.show', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/shufa/:author/:fatie', {
        templateUrl: 'show/show.html',
        controller: 'ShowCtrl'
      });
    }])

    .directive('fatieRepeatFinished', function() {
      return function(scope, element, attrs) {
        if (scope.$last){
            var swiper = new Swiper('.swiper-container', {
                scrollbar: '.swiper-scrollbar',
                scrollbarHide: true,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 15,
                grabCursor: true
            });
        }
      };
    })

    .controller('ShowCtrl', ['$scope', '$http', '$routeParams', '$sce', '$injector', function($scope, $http, $routeParams, $sce, $injector) {
        require(['show/controller'], function(controller) {
            $injector.invoke(controller, this, {'$scope': $scope});
        });
    }]);
});
