'use strict';

angular.module('shufabeitie.show', ['ngRoute', 'ksSwiper'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/shufa/:author/:fatie', {
            templateUrl: 'show/show.html',
            controller: 'ShowCtrl'
        });
    }
])

.directive('ksFatieImage', function() {

    function link(scope, element, attrs) {
        element.on('slideChangeEnd', function(e) {
            // 也可以在这个事件监控里完成img对象的src属性操作。
            console.log(e, e.target);
        });
        // 操作显示的slide的image大图
        scope.$on('slideChangeEnd' + attrs.index, function() {
            var $img = $(element).find('img.beitie-img');
            var src = $img.attr('src');
            if (!/w1000/.test(src)) {
                var preload = new Image();
                preload.src = src.replace(/w100/, 'w1000');
                preload.onload = function() {
                    $img.attr('src', preload.src);
                };
            }
        });
    }

    return {
        restrict: 'E',
        link: link,
        scope: {
            image: '=image',
            fatie: '=fatie'
        },
        template: '<img ng-src="/{{fatie.path100}}/{{image}}" class="img-responsive beitie-img">'
    };
})

.controller('ShowCtrl', ['$scope', '$http', '$routeParams', '$sce',
    function($scope, $http, $routeParams, $sce) {
        var url = ['/shufa/', $routeParams.author, '/', $routeParams.fatie, '/'].join('');
        var callback = function(swiper) {
            swiper.wrapper.find('.swiper-slide-active img.beitie-img').trigger('slideChangeEnd');
            $scope.$broadcast('slideChangeEnd' + swiper.activeIndex);
        };
        $scope.fatie = {
            author: $routeParams.author,
            paper: $routeParams.fatie,
            images: []
        };
        $http.get(url, {
            cache: true
        }).success(function(data) {
            $scope.fatie = data;
            $scope.published = 'hide';
            $scope.cover = '/' + data.path1000 + '/' + data.images[0];
            if (data.info) {
                if (data.info.published) {
                    $scope.published = 'show';
                }
                if (data.info.text) {
                    data.info.html = $sce.trustAsHtml('<p>' + data.info.text.trim().replace(/\n/g, '<p>'));
                }
            }

            $scope.swiper = {};
            $scope.onReadySwiper = function(swiper) {
                callback(swiper);
                swiper.on('slideChangeEnd', callback);
            };

        });

    }
]);
