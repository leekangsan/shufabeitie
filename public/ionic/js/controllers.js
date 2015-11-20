angular.module('shufabeitie.controllers', [])

.controller('IndexCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.faties = [];
        $http.get('/', {
            cache: true
        }).success(function(data) {
            $scope.faties = data;
        });
    }
])

.controller('AuthorsCtrl', ['$scope', '$http', '$stateParams',
    function($scope, $http, $stateParams) {
        $scope.authors = [];
        console.log($stateParams);
        $http.get('/shufa/', {
            cache: true
        }).success(function(data) {
            $scope.authors = data;
        });
    }
])

.controller('FatiesCtrl', ['$scope', '$http', '$stateParams',
    function($scope, $http, $stateParams) {
        $scope.author = $stateParams.author;
        console.log($stateParams.author);
        $scope.faties = [];
        var url = ['/shufa/', $stateParams.author, '/'].join('');
        $http.get(url, {
            cache: true
        }).success(function(data) {
            $scope.faties = data;
        });
    }
])

.controller('ShowCtrl', ['$scope', '$http', '$stateParams', '$sce',
    function($scope, $http, $stateParams, $sce) {
        var $ = angular.element;
        var url = ['/shufa/', $stateParams.author, '/', $stateParams.fatie, '/'].join('');
        $scope.fatie = {
            author: $stateParams.author,
            paper: $stateParams.fatie,
            images: []
        };
        $scope.$watch('fatie.current', function(newValue, oldValue) {
            console.log(arguments);
        });
        $http.get(url, {
            cache: true
        }).success(function(data) {
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

            $scope.slideHasChanged = function($index) {
                // https://docs.angularjs.org/error/$parse/isecdom
                // 文档说明不要在controller中操作DOM对象和返回DOM对象，这是很不好的编程习惯，不利于关注分离(separation of concerns)。
                // Note: This error often means that you are accessing DOM from your controllers, which is usually a sign of poor coding style that violates separation of concerns.
                // 按照angular way，dom对象操作都使用directive
                // slideHashChange这个事件无法获取event对象，想对dom对象操作最好配合directive操作
                // 在每个图片上绑定一个angular directive，
                // 然后用这个指令在图片上用scope.$on绑定一个自定义事件，再在这里触发事件往下层子元素传播
                // 从而可以在其下面的图片对象可以捕获到这个自定义事件，并进行相应的DOM操作。
                // https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$emit
                // $emit(name, args);
                // Dispatches an event name upwards through the scope hierarchy notifying the registered $rootScope.Scope listeners.
                // $broadcast(name, args);
                // Dispatches an event name downwards to all child scopes (and their children) notifying the registered $rootScope.Scope listeners.
                $scope.$broadcast('swipe' + $index);
                // 触发自定义的$watcher，通过$watcher监控model的变化，进行相应的操作。
                $scope.fatie.current = $index;
            };
        });
    }
])

.directive('fatieImage', function() {
    return {
        link: function(scope, element, attrs) {
            var index = scope.index;
            if (index === 0) {
                element[0].src = attrs.img;
                element.parent().addClass('ion-slide-first');
            } else {
                element[0].src = attrs.src;
            }
            scope.$on('swipe' + index, function(event) {
                // console.log(event.name, element, attrs);
                var src = attrs.src;
                var img = attrs.img;
                console.log(src, img);
                if (img != src) {
                    var preload = new Image();
                    preload.src = img;
                    preload.onload = function() {
                        element[0].src = img;
                    };
                }
            });
        }
    }
})

.controller('SearchCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.faties = [];
        $scope.search = {
            keywords: ''
        };
        $scope.search = function() {
            console.log($scope.search.keywords);
            if ($scope.search.keywords) {
                // cache – {boolean|Cache} – If true, a default $http cache will be used to cache the GET request, NOT FOR POST request.
                $http.post('/search', {
                    keywords: $scope.search.keywords
                }).success(function(data) {
                    $scope.faties = data;
                });
            }
        };
    }
]);
