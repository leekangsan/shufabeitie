define(['jquery', 'can'], function($, can) {

    return can.Control({
        defaults: {
            view: 'templates/authors.html'
        }
    }, {
        init: function(element, options) {
            var self = this;
            self.author = can.compute('');
            $.getJSON('/shufa/').done(function(authors) {
                self.authors = authors;
                self.list = new can.List(authors);
                self.render();
            });
        },
        'form submit': function(form, event) {
            var reg = new RegExp(this.author());
            var matched = this.authors.filter(function(t) {
                return reg.test(t);
            });
            // 更新双向绑定的model
            this.list.replace(matched);
            return false;
        },
        render: function() {
            var self = this;
            can.view(self.options.view, {author: self.author, authors: self.list}, function(fragment) {
                self.element.html(fragment);
            });
        }
    });

});
