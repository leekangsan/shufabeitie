$(function() {
    var blockDisplay = false,
        blocks = function() {
            if (blockDisplay) {
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
        blockDisplay = !blockDisplay;
        blocks();
    });

    // 点击当前的图片，重新定位到当前图片起始位置
    $('.beitie-img-container').click(function() {
        var id = $(this).attr('id');
        blockDisplay = false;
        blocks();
        window.location.href = '#' + id;
    });

    $('.beitie-lazy-img').lazyload({
        load: blocks
    });

});
