define(['jquery', 'backbone', 'handlebars', 'text!templates/authors.html', 'text!templates/author.html'], function($, Backbone, Handlebars, authorsTemplate, authorTemplate) {
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
        template: Handlebars.compile(authorTemplate),
        render: function() {
            var html = this.template({
                authors: collection.map(function(f) {
                    return {
                        author: f.get('author')
                    }
                })
            });
            this.$('#beitie-authors').html(html);
            return this;
        },
        events: {
            'submit .author-form': "filter",
            'keyup #author-query': "filter"
        },
        filter: function() {
            var author = $('#author-query').val();
            var reg = new RegExp(author.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            var models = all.filter(function(f) {
                return reg.test(f.get('author'));
            }).map(function(f) {
                return {author: f.get('author')};
            });
            collection.reset(models);
            return false;
        },
        update: function() {
            this.$el.html(authorsTemplate);
            all.fetch({
                reset: true,
                cache: true
            });
        }
    });
});
