// viewmodel class
define(['jquery', 'knockout'], function($, ko) {
    return function () {
        var self = this;
        self.faties = ko.observable();
        self.show = function() {
            console.log(this, self, arguments);
        };
        $.get('/').then(function(list) {
            $('#beitie-index-container').removeClass('hide');
            $.each(list, function(index, item) {
                item.href = ['#/shufa/', item.author, '/', item.paper].join('');
                item.text = (index + 1) + '.' + item.paper;
            });
            return list;
        }).done(self.faties);
    };
});
