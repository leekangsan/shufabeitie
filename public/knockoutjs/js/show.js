// viewmodel class
define(['jquery', 'knockout', 'swiper', 'text!templates/show.html'], function($, ko, Swiper, template) {
    /**
     *
     * Passing parameters
     * As you have seen in the examples above, you can use a params attribute to supply parameters to the component viewmodel. The contents of the params attribute are interpreted like a JavaScript object literal (just like a data-bind attribute), so you can pass arbitrary values of any type. Example:
     *
     * <unrealistic-component
     *   params='stringValue: "hello",
     *           numericValue: 123,
     *           boolValue: true,
     *           objectValue: { a: 1, b: 2 },
     *           dateValue: new Date(),
     *           someModelProperty: myModelValue,
     *           observableSubproperty: someObservable().subprop'>
     * </unrealistic-component>
     *
     * Communication between parent and child components
     * If you refer to model properties in a params attribute, then you are of course referring to the properties on the viewmodel outside the component (the ‘parent’ or ‘host’ viewmodel), since the component itself is not instantiated yet. In the above example, myModelValue would be a property on the parent viewmodel, and would be received by the child component viewmodel’s constructor as params.someModelProperty.
     *
     * This is how you can pass properties from a parent viewmodel to a child component. If the properties themselves are observable, then the parent viewmodel will be able to observe and react to any new values inserted into them by the child component.
     *
     * Knockout will invoke your constructor once for each instance of the component, producing a separate viewmodel object for each.
     *
     */
    var ShowViewModel = function (params) {
        var self = this;
        self.beitie = ko.observable();

        console.log(params);
        // console.log(ko.toJS(params));
        // console.log(ko.toJS(params.author));
        var author = params.author(), fatie = params.fatie();
        var url = ['/shufa/', author, '/', fatie, '/'].join('');

        $.get(url).then(function(beitie) {
            beitie.href = '#/shufa/' + author;
            beitie.prev = '#/shufa/' + author + '/' + beitie.prev;
            beitie.next = '#/shufa/' + author + '/' + beitie.next;
            beitie.path100 = '/' + beitie.path100 + '/';
            beitie.path1000 = '/' + beitie.path1000 + '/';
            beitie.cover = beitie.path1000 + beitie.images[0];
            beitie.published = 'hide';
            if (beitie.info) {
                if (beitie.info.published) {
                    beitie.published = 'show';
                }
                if (beitie.info.text) {
                    beitie.info.html = ('<p>' + beitie.info.text.trim().replace(/\n/g, '<p>'));
                }
            }
            // console.log(beitie);
            return beitie;
        }).done(self.beitie);

        self.swiper = function() {
            new Swiper('.swiper-container', {
                scrollbar: '.swiper-scrollbar',
                scrollbarHide: true,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 15,
                grabCursor: true
            });

            $('.swiper-container').on('click', '.swiper-slide .beitie-img', function(event) {
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
            });
        };
    };

    ko.components.register('fatie-show', {
        viewModel: ShowViewModel,
        template: template
    });

});

