// viewmodel class
define(['jquery', 'knockout'], function($, ko) {
    return function () {
        var self = this;
        self.keywords = ko.observable();
        self.faties = ko.observable();

        self.search = function() {
            var keywords = self.keywords;
            if (keywords) {
                var $this = this;
                $.post('/search', {keywords: keywords}).then(function(list) {
                    $('#beitie-search-container').removeClass('hide');
                    $.each(list, function(index, item) {
                        item.href = ['#/shufa/', item.author, '/', item.paper].join('');
                        item.text = (index + 1) + '.' + item.paper;
                    });
                    return list;
                }).done(self.faties);
            }
            return false;
        };
    };
});

