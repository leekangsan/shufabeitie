define(['jquery', 'can', 'swiper'], function($, can, Swiper) {

    return can.Control({
        defaults: {
            view: 'templates/show.html'
        }
    }, {
        init: function(element, options) {
            var author = this.options.author, fatie = this.options.fatie;
            this.render(author, fatie);
        },
        ".swiper-slide .beitie-img click": function(element, event) {
            // console.log(element);
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
        },
        render: function(author, fatie) {
            var self = this;
            var url = ['/shufa/', author, '/', fatie, '/'].join('');
            $.getJSON(url).done(function(data) {
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
                can.view(self.options.view, data, function(fragment) {
                    self.element.html(fragment);

                    // swiper
                    new Swiper('.swiper-container', {
                        scrollbar: '.swiper-scrollbar',
                        scrollbarHide: true,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        spaceBetween: 15,
                        grabCursor: true
                    });
                });
            });
        }
    });

});
