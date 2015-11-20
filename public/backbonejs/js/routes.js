/**
 * backbone.js + require.js + handlebars.js
 *
 * backbone.js其实与angularjs/emberjs还是有所有同的，其实backbone.js只能说是一个类库，
 * 而不是一个完整的javascript mvc框架。
 * 在backbone.js中没有直接提供模板，需要用到underscore或者是Handlebars，其中Backbone.View
 * 其实起到了Controller的作用，配合其Router/Model/Collection，以及非常重要的自定义事件机制，
 * 其实就是在程序中加入很多重要的回调勾子，功能非常强大，已经为应用撑起了一个基本骨架，
 * 开发人员往其中加入自己的业务逻辑就可以，真是非常简单好用。
 *
 * 这个组合是还是很不错的，学习成本少，代码简洁，易维护。
 * 比较react稍复杂一点，模板引擎上react因为有jsx的编译帮助，最后生成的是js模板文件，
 * 得益于其虚拟DOM对象的管理方法，性能上要高于Handlebars。
 *
 */
define(['backbone', 'handlebars'], function(Backbone, Handlebars) {
    Handlebars.registerHelper('foreach', function(context, options) {
        var ret = [];
        var data = Handlebars.createFrame(options.data || {});
        if (context) {
            for (var i = 0, j = context.length; i < j; i++) {
                data.index = i + 1;
                ret.push(options.fn(context[i], {data: data}));
            }
        } else {
            console.log(context);
        }
        return ret.join('\n');
    });

    // views
    var index, authors, search, faties, show;

    return Backbone.Router.extend({
        routes: {
            "": "index",
            "authors": "authors",
            "shufa/:author": "faties",
            "shufa/:author/:fatie": "show",
            "search": "search",
            "*error": "error"
        },
        index: function() {
            if (index) {
                index.update();
            } else {
                require(['js/index'], function(View) {
                    index = new View;
                    index.update();
                });
            }
        },
        authors: function() {
            if (authors) {
                authors.update();
            } else {
                require(['js/authors'], function(View) {
                    authors = new View;
                    authors.update();
                });
            }
        },
        faties: function(author) {
            if (faties) {
                faties.update(author);
            } else {
                require(['js/faties'], function(View) {
                    faties = new View;
                    faties.update(author);
                });
            }
        },
        show: function(author, fatie) {
            if (show) {
                show.update(author, fatie);
            } else {
                require(['js/show'], function(View) {
                    show = new View;
                    show.update(author, fatie);
                });
            }
        },
        search: function() {
            if (search) {
                search.render();
            } else {
                require(['js/search'], function(View) {
                    search = new View;
                    search.render();
                });
            }
        },
        error: function() {
            console.log('error route');
        }
    });
});
