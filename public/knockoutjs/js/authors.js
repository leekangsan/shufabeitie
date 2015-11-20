// viewmodel class
define(['jquery', 'knockout'], function($, ko) {
    return function() {
        var self = this;
        self.authors = ko.observable();

        $.get('/shufa/').then(function(list) {
            $('#beitie-authors-container').removeClass('hide');
            return $.map(list, function(author, index) {
                return {
                    href: ['#/shufa/', author].join(''),
                    text: (index + 1) + '.' + author
                }
            });
        }).done(this.authors);
    };
});
