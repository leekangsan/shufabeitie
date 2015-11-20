requirejs.config({
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    },
    baseUrl: '.',
    paths: {
        can: 'bower_components/canjs/amd/can',
        jquery: 'bower_components/jquery/dist/jquery',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        swiper: 'bower_components/swiper/dist/js/swiper',
        text: 'bower_components/requirejs-text/text'
    },
    deps: ['jquery', 'bootstrap']
});

// initialize routing
require(['jquery', 'js/routes'], function($, Router) {
    $('.nav-link').click(function() {
        $('#navbar-collapse').removeClass('in');
    });

    Router.start();
});

