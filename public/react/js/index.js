define(['jquery', 'backbone', 'build/index'], function($, Backbone, ReactView) {
    // collection create
    var Faties = Backbone.Collection.extend({
        url: '/'
    });
    var collection = new Faties;

    return Backbone.View.extend({
        el: $("#beitie-container"),
        initialize: function() {
            this.listenTo(collection, 'reset', this.render);
        },
        update: function() {
            collection.fetch({
                reset: true,
                silent: false,
                cache: true
            });
        },
        render: function() {
            if (collection.length) {
                ReactView.render({
                    container: this.$el,
                    faties: collection.map(function(f) {
                        return {
                            author: f.get('author'),
                            paper: f.get('paper')
                        }
                    })
                });
            }
            return this;
        }
    });
});
