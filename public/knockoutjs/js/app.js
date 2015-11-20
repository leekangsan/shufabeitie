requirejs.config({
    shim: {
        pathjs: {
            exports: 'Path'
        },
        bootstrap: {
            deps: ['jquery']
        }
    },
    baseUrl: '',
    paths: {
        jquery: 'bower_components/jquery/dist/jquery',
        bootstrap: 'bower_components/bootstrap/dist/js/bootstrap',
        knockout: 'bower_components/knockout/dist/knockout.debug',
        pathjs: 'bower_components/pathjs/path',
        swiper: 'bower_components/swiper/dist/js/swiper',
        text: 'bower_components/requirejs-text/text'
    },
    deps: ['jquery', 'bootstrap', 'pathjs', 'knockout']
});

require(['js/routes'], function(Router) {
    // initialize pathjs routes
    Router.start();
});
