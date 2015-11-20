/**
 * Knockout.js
 *
 * knockout.js和angular.js都可以在一个页面的局部使用，这点比ember.js要灵活一些，ember.js想做的太多了，最好在全新的应用里使用emberj.js，在原有旧系统中用起来不是很方便。相比angular.js，knockout.js要简单很多，但相应也缺少路由组件，可以考虑第三方的插件，如非常简单的Path.js，还有Sammy.js和History.js都是很不错的选择，与require.js和jquery.js也内置做了些支持，结合在一起配合使用非常舒服。
 * knockout.js的架构采用MVVM的设计模式，其中的model层非常薄，view层是一种基于DOM的声明式的模板，与mustache/handlebars这些字符串模板引擎不同，利用foreach/if/ifnot/with/component这些UI binding绑定器显示逻辑，也是比较薄的，因此其viewmodel就非常厚重，model初始化，更新，事件的绑定和执行，后端的ajax交互等代码都是在viewmodel中执行的。而angular.js相比较而言，分层更细，通过依赖注入，将所需要的service注入到controller中，而事件写在directive中，甚至DOM动画写在animations里，UI上的一些util方法写在filter里，从而实现UI架构上的关注分离，这样controller就不会那么厚重了，由此来说，如果团队人比较多的话，angular.js可能会更适合，如果项目不大，甚至也不是一个SPA单页应用，那么knockout.js会是不错的选择。
 *
 * knockout.js是完全按照MVVM进行设计的框架，涉及到的概念级别的东西就不像angular.js那么多，也没那么复杂，上手的学习曲线平缓，难度小，当然angular.js初始上手也是非常的简单易用，但内容和概念多，所以后面学习成本是不少的。knockout.js中主要有这些知识点：viewmodel/observables/binding/components，主要就是这些内容，其中binding插件的实现也非常清楚，需要注意其中的update方法，在以前2.0.0版本中，只要observables对象变更，就会调用update方法执行的，但是在3.3.0版本中如果没有在update方法中用ko.unwrap(valueAccessor())方法访问过observables对象的值，就不会调用update方法。
 * <code>
 * ko.bindingHandlers.bind = {
 *     init: function(element, valueAccessor) {
 *         alert('init');
 *     },
 *     update: function(element, valueAccessor) {
 *         ko.unwrap(valueAccessor());
 *         alert('update');
 *     }
 * };
 * </code>
 * References:
 * http://stackoverflow.com/questions/23878702/knockout-custom-binding-update-not-firing
 * http://jsfiddle.net/vMD74/14/
 *
 * 在knockout.js中，viewmodel/observables是其核心，但是knockout.js在其内部利用观察者模式(observer pattern)(observalbe，即model即此模式中的subject)机制封装了之后，外部使用已经比较简单的，注意一下每个observable对象其实是个function对象，可以通过ko.unwrap(observable)方法或者是直接调用observable()得到其实际的值，如果传参数进去observable(newValue)，就相当于更新了obserable对象。
 *
 * components对象的创建，是为了实现代码的重用，相当于为HTML自定义标签，与angular.js的directive，和ember.js中的Ember.Component一样的作用。实际上为其开发自定义的components也很方便，为其提供一个必选的模板和可选的viewmodel即可，如有viewmodel，则其构造方法会有一个params参数，component在使用时，通过其一个名为params的属性，将外部的参数传递给viewmodel的构造方法。相比angular.js的directive，knoukout.js的components实现更简洁明了，更易掌握使用。
 *
 * knockout.js还提供了一个虚拟DOM的功能，可以更灵活的控制模板渲染，其利用了HTML的comment标签，所以最后生成的DOM不会多出额外生成的一些div容器节点，这个也很好用。
 *
 * 最后再赞一下knockout.js作者，为了让新手尽快掌握这个框架，做了一个非常好的应用示例帮助新手：http://learn.knockoutjs.com/
 *
 */

// pathjs routes config
define(['jquery', 'pathjs'], function($, Path) {

    // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    function showPanel(id) {
        $('.ko-show').removeClass('ko-show');
        $(id).addClass('ko-show');
    }

    // viewmodel classes
    var index, authors, faties, search, show;

    Path.map("#/").to(function() {
        if (!index) {
            require(['knockout', 'js/index'], function(ko, viewModel) {
                index = new viewModel;
                ko.applyBindings(index, document.getElementById('ko-index'));
            });
        }
    }).enter(function() {
        showPanel('#ko-index');
    });

    Path.map("#/authors").to(function() {
        if (!authors) {
            require(['knockout', 'js/authors'], function(ko, viewModel) {
                authors = new viewModel;
                ko.applyBindings(authors, document.getElementById('ko-authors'));
            });
        }
    }).enter(function() {
        showPanel('#ko-authors');
    });

    Path.map("#/shufa/:author").to(function() {
        var author = this.params['author'];
        if (!faties) {
            require(['knockout', 'js/faties'], function(ko, viewModel) {
                faties = new viewModel;
                ko.applyBindings(faties, document.getElementById('ko-faties'));
                faties.update(author);
            });
        } else {
            faties.update(author);
        }
    }).enter(function() {
        showPanel('#ko-faties');
    });

    Path.map("#/shufa/:author/:fatie").to(function() {
        var author = this.params['author'];
        var fatie = this.params['fatie'];
        if (!show) {
            require(['knockout', 'js/show'], function(ko) {
                // view model
                var viewModel = function() {
                    this.params = ko.observable();
                };

                show = new viewModel;
                ko.applyBindings(show, document.getElementById('ko-show'));
                show.params({fatie: fatie, author: author});
                console.log(show.params());
            });
        } else {
            show.params({fatie: fatie, author: author});
        }
    }).enter(function() {
        showPanel('#ko-show');
    });

    Path.map("#/search").to(function() {
        if (!search) {
            require(['knockout', 'js/search'], function(ko, viewModel) {
                search = new viewModel;
                ko.applyBindings(search, document.getElementById('ko-search'));
            });
        }
    }).enter(function() {
        showPanel('#ko-search');
    });

    return {
        start: function() {
            $('.nav-link').click(function() {
                $('#navbar-collapse').removeClass('in');
            });
            Path.root("#/");
            Path.listen();
        }
    };
});
