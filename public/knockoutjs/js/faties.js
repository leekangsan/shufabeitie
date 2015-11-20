// viewmodel class
define(['jquery', 'knockout'], function($, ko) {
    return function () {
        var self = this;
        self.author = ko.observable();
        self.faties = ko.observable();

        self.update = function(author) {
            self.author(author);

            $.get('/shufa/' + author + '/').then(function(list) {
                $('#beitie-list').removeClass('hide');
                $.each(list, function(index, item) {
                    item.href = ['#/', item.value].join('');
                    item.text = (index + 1) + '.' + item.key;
                });
                return list;
            }).done(self.faties);
        };
    };
});

