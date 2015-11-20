angular.module('shufabeitie', ['ionic', 'pasvaz.bindonce', 'shufabeitie.controllers'])

.run(['$ionicPlatform', '$ionicConfig', function($ionicPlatform,$ionicConfigProvider) {
  $ionicPlatform.ready(function() {
    // config tabs bar in bottom of screen.
    $ionicConfigProvider.tabs.position('bottom');

    // Hide the accessory bar by default
    // (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('ionic', {
    // With abstract set to true, that means this state can not be explicitly activated.
    // It can only be implicitly activated by activating one of its children.
    abstract: true,

    // This abstract state will prepend '/' onto the urls of all its children.
    url: '/',


    // Example of loading a template from a file. This is also a top level state,
    // so this template file will be loaded and then inserted into the ui-view
    // within index.html.
    // setup an abstract state for the tabs directive
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('ionic.index', {
    // Using an empty url means that this child state will become active
    // when its parent's url is navigated to. Urls of child states are
    // automatically appended to the urls of their parent. So this state's
    // url is '/' (because '/' + '').
    url: '',
    views: {
      'index': {
        templateUrl: 'templates/index.html',
        controller: 'IndexCtrl'
      }
    }
  })

  .state('ionic.search', {
    url: 'search',
    views: {
      'search': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('ionic.authors', {
    url: 'authors',
    views: {
      'authors': {
        templateUrl: 'templates/authors.html',
        controller: 'AuthorsCtrl'
      }
    }
  })

  .state('ionic.faties', {
    url: 'shufa/:author',
    views: {
      'authors': {
        templateUrl: 'templates/faties.html',
        controller: 'FatiesCtrl'
      }
    }
  })

  .state('ionic.show', {
    url: 'shufa/:author/:fatie',
    views: {
      'authors': {
        templateUrl: 'templates/show.html',
        controller: 'ShowCtrl'
      }
    }
});

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
