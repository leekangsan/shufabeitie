define(['jquery', 'can'], function($, can) {

    return can.Control.extend({
        defaults: {
            view: 'templates/index.html'
        }
    }, {
        init: function(el, options) {
            // Control中的第一个参数defaults会被做为options传给init第2个参数
            var self = this;
            // cache
            self.html = '';
            $.getJSON('/').done(function(faties) {
                // 通过这个方式异步加载模板
                // Asynchronous Loadin view
                can.view(self.options.view, {
                    faties: faties
                }, function(fragment) {
                    self.html = $('<div>').append(fragment).html();
                    self.element.html(self.html);
                });
            });
        },
        render: function() {
            this.element.html(this.html);
        }
    });

});
