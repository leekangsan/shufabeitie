$(function() {
    $('.paper-name-container').hover(function() {
        $('.paper-name').css({visibility: 'visible'});
    }, function() {
        $('.paper-name').css({visibility: 'hidden'});
    });

    $('.navbar-brand').click(function() {
        $('#beitie-text-container').removeClass('hide');
        return false;
    });

    var blocksDisplay = false,
        blocks = function() {
            if (blocksDisplay) {
                var numOfCol = 4,
                    width = $(window).width();
                if (width <= 960) {
                    numOfCol = 2;
                }
                $('#beitie-imgs-container').blocksIt({
                    numOfCol: numOfCol,
                    initX: 8,
                    initY: 0,
                    offsetX: 10,
                    offsetY: 10,
                    blockElement: '.beitie-img-container'
                });
            } else {
                $('#beitie-imgs-container').blocksDestroy();
            }
        };

    $('#beitie-img-blocks').click(function() {
        blocksDisplay = !blocksDisplay;
        blocks();
        return false;
    });

    var current = 0;
    $('#beitie-img-home').click(function() {
        current = 0;
    });

    // 点击当前的图片，重新定位到当前图片起始位置
    $('.beitie-img-container').click(function() {
        blocksDisplay = false;
        blocks();
        var id = this.id.replace('a', '');
        current = parseInt(id, 10);
        window.location.href = '#a' + current;
    });

    // 向下翻页
    var nextLoading = false;
    $('#beitie-pagination-next').click(function() {
        if (nextLoading === true) {
            return false;
        }
        current = current + 1;
        var next = $('#a' + current);
        if (next.length === 0) {
            current = current - 1;
            $('#beitie-img-blocks,#beitie-pagination-next').toggleClass('hide');
            return false;
        } else {
            if (next.hasClass('beitie-lazy-container')) {
                nextLoading = true;
                next.removeClass('beitie-lazy-container');
                next.removeClass('hide');
                var img = new Image();
                var $img = $('<img src="/images/loading.gif" class="img-responsive beitie-img loading-img" />');
                next.html($img);
                img.src = next.data('original');
                img.onerror = function() {
                    nextLoading = false;
                    // console.error(img);
                    next.remove();
                };
                img.onload = function() {
                    // next image loading finished.
                    nextLoading = false;
                    $img.attr('src', this.src).removeClass('loading-img');
                    next = $('#a' + (current + 1));
                    if (next.length && next.hasClass('beitie-lazy-container')) {
                        // preload next image.
                        var img = new Image();
                        img.src = next.data('original');
                    }
                };
            }
            window.location.href = '#a' + current;
        }
        return false;
    });

});
