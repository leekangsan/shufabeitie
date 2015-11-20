'use strict';

require.config({
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        angular: 'bower_components/angular/angular',
        angularRoute: 'bower_components/angular-route/angular-route',
        angularMocks: 'bower_components/angular-mocks/angular-mocks',
        swiper: 'bower_components/swiper/dist/js/swiper',
        text: 'bower_components/requirejs-text/text'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: ['angular'],
        angularMocks: {
            deps: ['angular'],
            exports: 'angular.mock'
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    priority: ["angular"],
    deps: ['jquery', 'bootstrap', 'swiper'],
    baseUrl: ''
});

require(['angular', 'js/app'], function(angular, app) {
    angular.element().ready(function() {
        // bootstrap the app manually
        angular.bootstrap(document, ['shufabeitie']);
    });
});
