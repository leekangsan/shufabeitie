define(['jquery', 'swiper', 'backbone', 'handlebars', 'text!templates/show.html'], function($, Swiper, Backbone, Handlebars, hbsTemplate) {
    var collection = new Backbone.Collection;
    return Backbone.View.extend({
        el: $("#beitie-container"),
        initialize: function() {
            this.listenTo(collection, 'reset', this.render);
        },
        update: function(author, fatie) {
            collection.url = ['/shufa/', author, '/', fatie, '/'].join('');
            collection.fetch({
                cache: true,
                silent: false,
                reset: true
            });
        },
        events: {
            "click .swiper-slide .beitie-img": function(event) {
                var $target = $(event.target);
                $target.css({
                    opacity: 0.2
                });
                var src = $target.data('src');
                var preload = new Image();
                preload.src = src;
                preload.onload = function() {
                    $target.attr('src', src).animate({
                        opacity: 1.0
                    }, 500);
                    $('#beitie-display-container').find('.beitie-img').css({
                        left: '110%'
                    }).attr('src', src).animate({
                        left: '0%'
                    }, 300);
                };
            }
        },
        template: Handlebars.compile(hbsTemplate),
        render: function() {
            if (!collection.length) {
                return this;
            }
            var data = collection.first().attributes;
            data.published = 'hide';
            if (data.info) {
                if (data.info.published) {
                    data.published = 'show';
                }
                if (data.info.text) {
                    data.info.html = ('<p>' + data.info.text.trim().replace(/\n/g, '<p>'));
                }
            }
            data.cover = data.images[0];
            var html = this.template(data);
            this.$el.html(html);

            var swiper = new Swiper('.swiper-container', {
                scrollbar: '.swiper-scrollbar',
                scrollbarHide: true,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 15,
                grabCursor: true
            });
            return this;
        }
    });
});
