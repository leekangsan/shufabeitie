define(['jquery', 'backbone', 'build/authors'], function($, Backbone, ReactView) {
    var Authors = Backbone.Collection.extend({
        parse: function(data) {
            return data.map(function(author) {
                return {
                    author: author
                }
            });
        },
        url: '/shufa/authors'
    });
    var all = new Authors;
    var collection = new Authors;
    return Backbone.View.extend({
        el: $("#beitie-container"),
        initialize: function() {
            this.listenTo(all, 'reset', this.filter);
            this.listenTo(collection, 'reset', this.render);
        },
        events: {
            'submit .author-form': "filter",
            'keyup #author-query': "filter"
        },
        filter: function() {
            var author = $('#author-query').val();
            var reg = new RegExp(author);
            var models = all.filter(function(f) {
                return reg.test(f.get('author'));
            }).map(function(f) {
                return {author: f.get('author')};
            });
            collection.reset(models);
            return false;
        },
        update: function() {
            all.fetch({
                reset: true,
                cache: true
            });
        },
        render: function() {
            ReactView.render({
                container: this.el,
                authors: collection.map(function(f) {
                    return f.get('author');
                }),
                callback: function() {
                    console.log(arguments);
                    console.log(this, this.container);
                    console.info('ReactView callback thisArg referrence to current options.');
                }
            });
            return this;
        }
    });
});
