/**
 * angularjs
 *
 * 其数据双向绑定的确非常强大，其框架背后的有很多设计理念也非常地独特，在使用过程中，是好是放下原来的知识体系，甚至在angularjs项目里都不要引入jquery，也不需要requirejs，项目过程中的问题最好使用angularjs way进行思考，不要去想用jquery怎么做，用原生js怎么做，应该想angular方式的解决方案。也正是这个框架颠覆了传统js使用方式的原因，所以在stackoverflow上，在javascript mvc框架中，提问angularjs的问题的人最多了。
 *
 * Scopes provide APIs ($watch) to observe model mutations.
 * Scopes provide APIs ($apply) to propagate any model changes through the system into the view from outside of the "Angular realm" (controllers, services, Angular event handlers).
 * Scope as Data-Model
 * Scope is the glue between application controller and the view. During the template linking phase the directives set up $watch expressions on the scope. The $watch allows the directives to be notified of property changes, which allows the directive to render the updated value to the DOM.
 * Both controllers and directives have reference to the scope, but not to each other.
 * Scope Events Propagation
 * Scopes can propagate events in similar fashion to DOM events. The event can be broadcasted to the scope children or emitted to scope parents.
 *
 * angularjs中，一些常用directive和service要理解熟悉，DI依赖注入有点借鉴Java中Spring的DI或者是Google自家guice的设计，实际上在前端也已经有比较成熟的模块注入机制，主要是AMD(requirejs)或CMD(seajs)，可以注入其他JS文件或者对象引用。$scope的相关概念最是重要，如上几段原文引用可知，用$scope.$watch()来监控model的变化，并且要理解$scope.$apply()和$scope.$degist()方法的用途和区别及何时要使用$scope.$apply()方法，一般使用angularjs内置的service时，不需要自己手工调用，只有在angularjs管理范围之外的js代码中，更新了model，则需要手动调用，以触发model-view的双向绑定。
 *
 * Scope is an object that refers to the application model. It is an execution context for expressions.
 * Scopes are arranged in hierarchical structure which mimic the DOM structure of the application. Scopes can watch expressions and propagate events.
 *
 * MVVM这个模式是MS的WPF中提出来的，然后前端开发人员用javascript实现了这个模式，比如KnockoutJS, Kendo MVVM 和 Knockback.js。
 * MVVM was originally defined by Microsoft for use with Windows Presentation Foundation (WPF) and Silverlight, having been officially announced in 2005 by John Grossman in a blog post about Avalon (the codename for WPF).
 *
 * 关于angularjs的UI架构设计模式网上也被讨论的非常多，但是根据数据双向绑定这个特点，大多数人就认为其是按照MVVM模式设计的。angularjs主要内容包括有Controller/Model/Scope/Services/View/Directive/Filter等，还有区分于View的Template，template经过Compiler编译之后生成的DOM对象才被称之为view，还有用于template的expressions，其分层很细，概念也非常多，不是MVVM可以直接概括的，其最初就是定义为一个类MVC的javascript前端框架，发展了几年之后，MVVM的优点自然也被angularjs吸收在其中，就更趋近MVVM，angularjs中的scope就是衔接model和view的桥梁，一定要对号入座的话，基本上就是MVVM模式中的viewmodel角色。对于开发人员来说，全新的按照angularjs way方式思考问题，解决问题就可以，不一定要执着于其是否就是MVVM，准确来说angularjs自己是定义为MVW模式的，就是model-View-Whatever形式。如下官方说明：
 * https://plus.google.com/+AngularJS/posts/aZNVhj355G2
 *
 * 常见的MVC中一般是view->model的单向绑定，也就是view可以获取model中数据，而不能变更model的值，而是通过controller进行model更新，model层变化通过controller来通知view层进行更新，从而实现关注分离，让代码可读性可维护性更加简单。view处理UI逻辑，model处理业务逻辑，并处理与后台数据的CRUD操作，这二者功能基本不变，但厚薄则在不同的MV*模式中，则有所不同。而MVVM模式在MVC基础上略有变化，引入了一个viewmodel对象，与view/model都是双向绑定的，model负责业务逻辑和数据，viewmodel负责表现逻辑和状态。也就是view可以直接改变model，而此model改变又引起其他view的改变，可能产生级联更新，带来view层自动更新的便捷同时，多了一些复杂度。当然有时input控件和model的双向绑定真心简单方便，所以MVVM模式流行起来，一定有其可取之处。关于MVC/MVP/MVVM的UI架构设计模式，以下几个链接可以学习一下MVC相关历史及知识，参考一下，但也不要全盘接受文章观点：
 * https://heim.ifi.uio.no/~trygver/themes/mvc/mvc-index.html
 * https://nirajrules.wordpress.com/2009/07/18/mvc-vs-mvp-vs-mvvm/
 * http://www.csdn.net/article/2015-02-12/2823934-MVC-vs-MVVM
 *
 * angularjs中的事件相关的及DOM相关的，一般是通过directive来管理，参考
 * https://docs.angularjs.org/error/$parse/isecdom
 * 不要在controller中操作DOM对象和返回DOM对象，这是很不好的编程习惯，不利于关注分离(separation of concerns)，而MVC、MVVM等UI架构设计模式，主要就是为了做到关注分离，各司其职，便于代码分工开发，测试和维护。
 * 原文: This error often means that you are accessing DOM from your controllers, which is usually a sign of poor coding style that violates separation of concerns.
 *
 * 一般操作DOM都在directive中完成，DOM事件监控也在directive中用scope.$on绑定，scope.$emit/scope.$broadcast触发，参考文档：
 * https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$on
 * https://docs.angularjs.org/guide/scope#integration-with-the-browser-event-loop
 * 在ionic版本有使用实例可参考。
 *
 * angularjs对于习惯java后台开发的人来说，真的非常合适，不同的分层解藕，相互之间影响尽可能的减少，很合适团队开发。angularjs中的directive与java后台中的taglib非常相似，或者可以理解为其就是对java的taglib的一种模仿，只是结合了scope和事件，变得更加灵活强大。taglib在java后台模板中使用，真的是又复杂又笨重，学习成本也高，各种框架又有各自不同却相似的taglib，相对来说，前端像angularjs的directive和Emberjs中的components中自定义的标签要简单并且强大，并且后端代码只要给前端回传JSON对象即可，一定程度上，也做到前端后端的关注分离，减少在后端模板中藕合太多业务逻辑。
 *
 * 关于angularjs的脏数据检查，对性能肯定是有影响的，并且官方也在文档里说明一个应用$watchers应该控制在2000个以内。其实一个应用很容易到达这个数字。查看当前应用当前页面里有多少个$watchers最快的方法就是直接从angular中得到：
 * <code>
 * angular.element(document.body).injector().get('$rootScope').$$watchersCount
 * </code>
 *
 * 或者是编码方式，下面代码里要根据ng-app位置改一下html/body，得到的结果与上面一致：
 * <code>
 *   (function () {
 *       // (You may need to change body to html or wherever you put your ng-app)
 *       var root = angular.element(document.getElementsByTagName('body'));
 *       var watchers = [];
 *       var f = function (element) {
 *           angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
 *               if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
 *                   angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
 *                       watchers.push(watcher);
 *                   });
 *               }
 *           });
 *           angular.forEach(element.children(), function (childElement) {
 *               f(angular.element(childElement));
 *           });
 *       };
 *       f(root);
 *       // Remove duplicate watchers
 *       var watchersWithoutDuplicates = [];
 *       angular.forEach(watchers, function(item) {
 *           if(watchersWithoutDuplicates.indexOf(item) < 0) {
 *                watchersWithoutDuplicates.push(item);
 *           }
 *       });
 *       console.log(watchersWithoutDuplicates.length);
 *   })();
 * </code>
 *
 */
'use strict';

// Declare app level module which depends on views, and components
angular.module('shufabeitie', [
  'ngRoute',
  'shufabeitie.home',
  'shufabeitie.authors',
  'shufabeitie.faties',
  'shufabeitie.show',
  'shufabeitie.search',
  'shufabeitie.filters',
  'shufabeitie.version'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}])
.controller('NavbarCtrl', ['$scope', function($scope) {
    $scope.navClick = function() {
        $('#navbar-collapse').removeClass('in');
    };
}]);
