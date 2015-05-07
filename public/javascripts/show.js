$(function() {
    $('.paper-name-container').hover(function() {
        $('.paper-name').css({visibility: 'visible'});
    }, function() {
        $('.paper-name').css({visibility: 'hidden'});
    });

    var current = 0;
    $('#beitie-img-home').click(function() {
        current = 0;
    });

    // 点击当前的图片，重新定位到当前图片起始位置
    $('.beitie-img-container').click(function() {
        var id = this.id.replace('a', '');
        current = parseInt(id, 10);
        window.location.href = '#a' + current;
    });

    // 向下翻页
    $('#beitie-img-next').click(function() {
        current = current + 1;
        var next = $('#a' + current);
        if (next.length === 0) {
            current = current - 1;
            $('#load-finished').removeClass('hide');
            return false;
        } else {
            if (next.hasClass('beitie-lazy-container')) {
                next.removeClass('beitie-lazy-container');
                next.removeClass('hide');
                var img = new Image();
                img.src = next.data('original');
                img.onload = function() {
                    next.html('<img src="' + this.src + '" class="img-responsive beitie-img" />');
                    next = $('#a' + (current + 1));
                    if (next.length && next.hasClass('beitie-lazy-container')) {
                        // preload next image.
                        var img = new Image();
                        img.src = next.data('original');
                    }
                    window.location.href = '#a' + current;
                };
            } else {
                window.location.href = '#a' + current;
            }
        }
    });

});
