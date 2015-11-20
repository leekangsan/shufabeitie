define(['jquery', 'backbone', 'handlebars', 'text!templates/search.html'], function($, Backbone, Handlebars, hbsTemplate) {
    return Backbone.View.extend({
        el: $("#beitie-container"),
        events: {
            "submit .search-form": function(event) {
                var keywords = $('#keywords').val();
                if (keywords) {
                    var $this = this;
                    $.post('/search', {keywords: keywords}).success(function(data) {
                        $this.render(data);
                    });
                }
                return false;
            }
        },
        template: Handlebars.compile(hbsTemplate),
        render: function(data) {
            var html = this.template({faties: data || []});
            this.$el.html(html);
            return this;
        }
    });
});
