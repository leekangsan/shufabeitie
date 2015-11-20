define(['jquery', 'backbone', 'handlebars', 'text!templates/index.html'], function($, Backbone, Handlebars, hbsTemplate) {
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
        template: Handlebars.compile(hbsTemplate),
        render: function() {
            if (collection.length) {
                var html = this.template({
                    faties: collection.map(function(f) {
                        return {
                            author: f.get('author'),
                            paper: f.get('paper')
                        }
                    })
                });
                this.$el.html(html);
            }
            return this;
        }
    });
});
