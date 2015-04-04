$(function() {
    var current = 'a1';

    $('#beitie-img-home').click(function() {
        current = 'a0';
    });

    $('#beitie-img-prev').click(function() {
        var index = parseInt(current.replace('a', ''), 10);
        if (index > 0) {
            index = index - 1;
            current = 'a' + index;
            this.href = '#' + current;
        } else {
            return false;
        }
    });

    // 向下翻页
    $('#beitie-img-next').click(function() {
        var index = parseInt(current.replace('a', ''), 10);
        index = index + 1;
        current = 'a' + index;
        var first = $('#a' + index);
        if (first.length === 0) {
            index = index - 1;
            current = 'a' + index;
            $('#load-finished').removeClass('hide');
            return false;
        } else {
            if (first.hasClass('beitie-lazy-img')) {
                var first = $('.beitie-lazy-img').first().removeClass('beitie-lazy-img');
                first.html('<img src="' + first.data('src') + '" class="col-md-12 col-xs-12 img-responsive beitie-img" />');
                this.href = '#' + current;
            } else {
                this.href = '#' + current;
            }
        }
    });

    // 点击当前的图片，也可以向下翻页
    $('.beitie-img-container').click(function() {
        var id = $(this).attr('id');
        var index = parseInt(id.replace('a', ''), 10);
        index = index + 1;
        current = 'a' + index;
        var first = $('#a' + index);
        if (first.length === 0) {
            index = index - 1;
            current = 'a' + index;
            $('#load-finished').removeClass('hide');
            return false;
        } else {
            if (first.hasClass('beitie-lazy-img')) {
                var first = $('.beitie-lazy-img').first().removeClass('beitie-lazy-img');
                first.html('<img src="' + first.data('src') + '" class="col-md-12 col-xs-12 img-responsive beitie-img" />');
                window.location.href = '#' + current;
            } else {
                window.location.href = '#' + current;
            }
        }
    });
});
