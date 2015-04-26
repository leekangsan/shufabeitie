$(function() {
    $('.paper-name-container').hover(function() {
        $('.paper-name').css({visibility: 'visible'});
    }, function() {
        $('.paper-name').css({visibility: 'hidden'});
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
    });

    // 点击当前的图片，重新定位到当前图片起始位置
    $('.beitie-img-container').click(function() {
        var id = $(this).attr('id');
        blocksDisplay = false;
        blocks();
        window.location.href = '#' + id;
    });

    $('.beitie-lazy-img').lazyload();
    blocks();

});
