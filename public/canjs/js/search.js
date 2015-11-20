define(['jquery', 'can'], function($, can) {

    return can.Control({
        defaults: {
            view: 'templates/search.html'
        }
    }, {
        init: function(element, options) {
            var self = this;
            self.list = new can.List;
            self.keywords = can.compute("王羲之");
            can.view(self.options.view, {keywords: self.keywords, faties: self.list}, function(fragment) {
                self.element.html(fragment);
            });
        },
        'form submit': function(form, event) {
            var self = this, keywords = this.keywords().trim();
            if (keywords) {
                $.post('/search', {keywords: keywords}).done(function(faties) {
                    self.list.replace(faties);
                });
            }
            return false;
        },
        render: function() {
            var self = this;
            can.view(self.options.view, {keywords: self.keywords, faties: self.list}, function(fragment) {
                self.element.html(fragment);
            });
        }
    });

});

