(function() {
    'use strict';

    /**
     * 关于Emberjs的一些问题
     *
     * 整个项目里没有使用Ember.Controller，controller应该做的事情和功能全部被下面的route处理了。
     * 所以设计上来说Emberjs里的route做了很多不应该做的事情，这些该是controller做的事情就应该只能写在controller中，
     * 现在这样的设计就没有controller存在的必要性了。
     *
     * 既然有了Ember.Component，就没必要存在Ember.View了，由Component来完成视图相关的功能即可，View完全多余，是个过度设计的东西，
     * 给开发带来额外的学习成本和使用难度，并且让人困惑。
     * 如果想在页面元素中添加事件绑定，action是无法得到事件对象event的，只能为这个元素设计一个Component，在这个Component上绑定DOM事件。
     * 而且还有很多事件名称与常规写法不一样，如mouseenter得用mouseEnter这样写。
     *
     * 关于其模板template和组件Component，哪果不使用requirejs/seajs之类的去异步加载，那么模板页面载入之后，整个页面上全部都是script标签，
     * 已经完全没有文档的作用，并且项目大的话，这个模板页面维护就比较麻烦了。所以Ember.js需要有个像requirejs这样的工具配合加载其不同的模板页面。
     * 默认情况下，每个组件是一个<div>元素。虽然可以再另外用tagName指定元素的外层元素，这还是个用起来不像React那么直观，框架做了这么多不该它做的事件，
     * 使开发者不见其利，已受其害。
     *
     * 关于Ember-data这个独立的插件，这个插件功能非常强，尤其配合服务器后端是ROR之类的REST
     * API风格的应用时。如果不是这个API风格，就需要重写一个Ember.Adapter，并且其中约束比较多。
     *
     * 这个框架基本上是照搬了服务器端的ROR设计模式到了客户端，对于一个全新的应用也许可以考虑使用，在旧系统里使用这个框架，真心不合适。
     * 并且在所有框架中，其学习成本最高，使用难度也是最大，并且todomvc设计下来性能也是最差的。
     *
     * 关于Ember.js的版本问题，在于其版本更新后接口改动太大，这点也是与ROR比较类工，可能与作者本人的工作经历有关吧，受DHH影响较大，
     * ember2.0.0版本与ember1.13.0版本是差别非常大的，并且其将使用HTMLBars做为其模板引擎，
     * HTMLBars据测试下来性能比Handlebars这些字符串模板引擎性能要高不少，但是还是没有Facebook的React性能高。详见测试：
     * http://voidcanvas.com/what-is-htmlbars-and-how-its-better-than-handlebars/
     *
     * emberjs这个mvc框架，其实包括angularjs，都有设计过度的地方，其实是严重背离KISS (Keep It Simple, Stupid!)原则的，不但自身实现复杂，
     * 最后提供出来的API还是很复杂，如果自已内部复杂，接口清晰易用倒还说得过去些。
     * 另外还有个原则是Worse is Better，Emberjs为了解决一些小问题，而引入了更复杂的解决方案，反导致了更多的问题和麻烦。
     * 比如属性计算，重新打开类和实例等，这些其实应该是受到Ruby的影响，这不是javascript使用的常规方式。
     *
     */
    App.Router.map(function() {
        this.route('index', {
            path: '/'
        });
        this.route('authors');
        this.route('search');
        this.route('faties', {
            path: 'shufa/:author'
        });
        this.route('show', {
            path: 'shufa/:author/:fatie'
        });
    });

    App.ApplicationRoute = Ember.Route.extend({});

    App.ApplicationView = Ember.Component.extend({
        didInsertElement: function () {
            // 为了监控菜单点击，得加出这么多代码，真是有点恶心呀
            $('.nav-link').click(function() {
                $('#navbar-collapse').removeClass('in');
            });
        }
    });

    App.IndexRoute = Ember.Route.extend({
        model: function() {
            return this.store.findAll('beitie');
        }
    });

    App.AuthorsRoute = Ember.Route.extend({
        model: function() {
            return this.store.findAll('author');
        }
    });

    App.SearchRoute = Ember.Route.extend({
        actions: {
            search: function() {
                var results = [];
                var keywords = $('#keywords').val();
                if (keywords) {
                    results = this.store.query('beitie', {keywords: keywords});
                }
                // 为了重新渲染页面，需要调用controller.set方法重置controller的model
                // 如果只是self.set('model', results)，因为self是route对象，所以不会有用的
                // http://guides.emberjs.com/v1.10.0/routing/specifying-a-routes-model/
                this.controller.set('model', results);
            }
        }
    });

    App.FatiesRoute = Ember.Route.extend({
        model: function(params) {
            // 以url做为id，进行查询和缓存
            var id = ['/shufa/', params.author, '/'].join('');
            return this.store.findRecord('fatie', id, params).then(function(record) {
                return {
                    author: params.author,
                    faties: record.get('faties')
                }
            });
        }
    });

    App.ShowRoute = Ember.Route.extend({
        model: function(params) {
            // 以url做为id，进行查询和缓存
            var id = ['/shufa/', params.author, '/', params.fatie, '/'].join('');
            return this.store.findRecord('show', id);
        },
        actions: {
            displayFatie: function(image) {
                console.log('display fatie from route', image);
            }
        }
    });

})();
