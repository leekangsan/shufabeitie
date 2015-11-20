define(['jquery', 'backbone', 'handlebars', 'text!templates/faties.html'], function($, Backbone, Handlebars, hbsTemplate) {
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
        template: Handlebars.compile(hbsTemplate),
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
            var html = this.template({papers: papers, author: collection.author});
            this.$el.html(html);
            return this;
        }
    });
});
