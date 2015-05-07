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

    var loading = false, limit = 0, container = $('#beitie-imgs-container'), href = window.location.href;
    var max = 10, more = '/more';
    if (/search/i.test(window.location.href)) {
        max = 15;
        more = '/search/more';
    }
    $(window).on('scroll.lazyload', function() {
        var bottom = $(document).height() - $(this).scrollTop() - $(this).height();
        if (bottom < 400) {
            if (limit > max) {
                $(window).unbind('scroll.lazyload');
            }
            if (!loading) {
                limit = limit + 1;
                loading = true;
                $.getJSON(more).done(function(json) {
                    // console.log(json);
                    $.each(json, function() {
                        var coverContainer = $('<div class="thumbnail beitie-img-container"></div>');
                        this.dir = this.author + '/' + this.paper;
                        coverContainer.append('<img src="/beitie/' + this.dir + '/w100/' + this.cover + '" data-original="/beitie/' + this.dir + '/w1000/' + this.cover + '" class="img-responsive beitie-img ajax-lazy-img">');
                        coverContainer.append('<div class="caption"><div class="text-center"><a target="_blank" href="/shufa/' + this.dir + '">' + this.paper + '</a></div></div>');
                        container.append(coverContainer);
                    });
                    $('.ajax-lazy-img').lazyload({ load: blocks });
                    loading = false;
                });
            }
        }
    });
});
