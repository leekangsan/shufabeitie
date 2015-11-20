requirejs.config({

    // Remember: only use shim config for non-AMD scripts,
    // scripts that do not already call define(). The shim
    // config will not work correctly if used on AMD scripts,
    // in particular, the exports and init config will not
    // be triggered, and the deps config will be confusing
    // for those cases.
    shim: {
        backbone: {
            // These script dependencies should be loaded before loading backbone.js
            deps: ['underscore', 'jquery'],
            // Once loaded, use the global 'Backbone' as the module value.
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        cache: {
            deps: ['backbone']
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    baseUrl: '.',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        react: 'bower_components/react/react',
        handlebars: 'bower_components/handlebars/handlebars.amd',
        underscore: 'bower_components/underscore/underscore',
        backbone: 'bower_components/backbone/backbone',
        cache: 'bower_components/backbone-fetch-cache/backbone.fetch-cache',
        swiper: 'bower_components/swiper/dist/js/swiper',
        text: 'bower_components/requirejs-text/text'
    },
    deps: ['jquery', 'bootstrap', 'backbone', 'cache']
});

// initialize Backbone routes and Backbone.history.start()
require(['jquery', 'js/routes'], function($, Router) {
    $('.nav-link').click(function() {
        $('#navbar-collapse').removeClass('in');
    });

    var router = new Router();
    var start = Backbone.history.start({pushState : false, root: '/react/'});
    console.log('backbone app start: ', start);

    // add event listener for route change
    router.on('route:search', function() {
        console.info('search route event');
    });
});
