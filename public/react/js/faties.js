define(['jquery', 'backbone', 'build/faties'], function($, Backbone, ReactView) {
    var collection = new Backbone.Collection();

    return Backbone.View.extend({
        el: $("#beitie-container"),
        initialize: function() {
            this.listenTo(collection, 'reset', this.render);
        },
        update: function(author) {
            collection.url = ['/shufa/', author, '/'].join('');
            collection.author = author;
            collection.fetch({
                cache: true,
                reset: true
            });
        },
        render: function() {
            if (!collection.length) {
                return this;
            }
            var papers = collection.map(function(model) {
                return {
                    key: model.get('key'),
                    value: model.get('value')
                };
            });
            ReactView.render({container: this.el, papers: papers, author: collection.author});
            return this;
        }
    });
});
