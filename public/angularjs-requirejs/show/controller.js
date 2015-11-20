'use strict';

define([], function() {
    return ['$scope', '$http', '$routeParams', '$sce', function($scope, $http, $routeParams, $sce) {
        var url = ['/shufa/', $routeParams.author, '/', $routeParams.fatie, '/'].join('');
        $scope.fatie = {author: $routeParams.author, paper: $routeParams.fatie, images: []};
        $http.get(url, {cache: true}).success(function(data) {
            $scope.fatie = data;
            $scope.published = 'hide';
            data.cover = data.images[0];
            if (data.info) {
                if (data.info.published) {
                    $scope.published = 'show';
                }
                if (data.info.text) {
                    data.info.html = $sce.trustAsHtml('<p>' + data.info.text.trim().replace(/\n/g, '<p>'));
                }
            }

            // event handler
            $scope.displayFatie = function($event, path, img) {
                var $target = $($event.target);
                $target.css({opacity: 0.2});
                var src = ['/', path, '/', img].join('');
                var preload = new Image();
                preload.src = src;
                preload.onload = function() {
                    $target.attr('src', src).animate({opacity: 1.0}, 500);
                    $('#beitie-display-container').find('.beitie-img').css({left: '110%'}).attr('src', src).animate({left: '0%'}, 300);
                };
            };
        });

    }];
});
