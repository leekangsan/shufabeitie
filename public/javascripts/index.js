$(function() {
    var blocks = function() {
        var numOfCol = 1,
            width = $(window).width();
        if (width > 1024) {
            numOfCol = 3;
        }
        $('#beitie-imgs-container').blocksIt({
            numOfCol: numOfCol,
            initX: 10,
            initY: 0,
            offsetX: 10,
            offsetY: 10,
            blockElement: '.beitie-img-container'
        });
    };

    $('.beitie-lazy-img').lazyload({ load: blocks });

    var loading = false, limit = 0, container = $('#beitie-imgs-container');
    $(window).on('scroll.lazyload', function() {
        var bottom = $(document).height() - $(this).scrollTop() - $(this).height();
        if (bottom < 400) {
            if (limit > 10) {
                $(window).unbind('scroll.lazyload');
            }
            if (!loading) {
                limit = limit + 1;
                loading = true;
                $.getJSON('more').done(function(json) {
                    // console.log(json);
                    $.each(json, function() {
                        var coverContainer = $('<div class="thumbnail beitie-img-container"></div>');
                        coverContainer.append('<img src="/' + this.beitie + '/w100/' + this.cover + '" data-original="/' + this.beitie + '/w1000/' + this.cover + '" class="img-responsive beitie-img ajax-lazy-img">');
                        coverContainer.append('<div class="caption"><div class="text-center"><a target="_blank" href="' + this.beitie + '">' + this.name + '</a></div></div>');
                        container.append(coverContainer);
                    });
                    $('.ajax-lazy-img').lazyload({ load: blocks });
                    loading = false;
                });
            }
        }
    });
});
