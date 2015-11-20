/**
 * backbone.js + require.js + react.js
 *
 * 这个组合是目前测试下来，学习成本少，性能高，代码最简单明了，最易维护的。
 * JSX文件的写法比较简单，简单到没有if标签，所有写JSX时，有时需要点技巧，
 * 并且要注意些小细节，如className和HTMLFor最后被编译成HTML标签的class和for属性。
 *
 */
define(['backbone'], function(Backbone) {

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
