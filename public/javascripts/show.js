$(function() {
    var current = 'a1';

    $('#beitie-img-home').click(function() {
        current = 'a0';
    });

    // 点击当前的图片，重新定位到当前图片起始位置
    $('.beitie-img-container').click(function() {
        var id = $(this).attr('id');
        current = id;
        window.location.href = '#' + current;
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
        var next = $('#a' + index);
        if (next.length === 0) {
            index = index - 1;
            current = 'a' + index;
            $('#load-finished').removeClass('hide');
            return false;
        } else {
            if (next.hasClass('beitie-lazy-img')) {
                next.removeClass('beitie-lazy-img');
                next.html('<img src="' + first.data('src') + '" class="col-md-12 col-xs-12 img-responsive beitie-img" />');
                this.href = '#' + current;
            } else {
                this.href = '#' + current;
            }
        }
    });

    // 自动延时加载下一张图片
    var lazyLoading = function () {
        var lazyImages = $('.beitie-lazy-img');
        if (lazyImages.length) {
            setTimeout(function () {
                var first = lazyImages.first().removeClass('beitie-lazy-img');
                first.html('<img src="' + first.data('src') + '" class="col-md-12 col-xs-12 img-responsive beitie-img" />');
                lazyLoading();
            }, 15000);
        } else {
            $('#load-finished').removeClass('hide');
        }
    };
    lazyLoading();

});
