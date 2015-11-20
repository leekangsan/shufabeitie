define(['jquery', 'backbone', 'build/search'], function($, Backbone, ReactView) {
    return Backbone.View.extend({
        el: $("#beitie-container"),
        events: {
            "submit .search-form": function(event) {
                var keywords = $('#keywords').val();
                if (keywords) {
                    var $this = this;
                    $.post('/search', {
                        keywords: keywords
                    }).success(function(data) {
                        $this.render(data);
                    });
                }
                return false;
            }
        },
        render: function(data) {
            ReactView.render({
                container: this.el,
                faties: data || []
            });
            return this;
        }
    });
});
