define(['jquery', 'can'], function($, can) {

    return can.Control({
        defaults: {
            view: 'templates/faties.html'
        }
    }, {
        init: function(element, options) {
            var author = this.options.author;
            this.list = new can.List;
            this.render(author);
        },
        render: function(author) {
            var self = this;
            $.getJSON('/shufa/' + author + '/').done(function(papers) {
                self.list.replace(papers);
                can.view(self.options.view, {author: author, papers: self.list}, function(fragment) {
                    self.element.html(fragment);
                });
            });
        }
    });

});


