(function(){

    App.FatieSwiperComponent = Ember.Component.extend({
        // didInsertElement：本钩子在视图一插入DOM后立即被调用。它可以访问视图的element，这在集成外部的库的时候尤为有用。
        // 任何显式的设置DOM代码都应该被限定在本钩子内。
        didInsertElement: function() {
            console.log(this);
            var swiper = new Swiper('.swiper-container', {
                scrollbar: '.swiper-scrollbar',
                scrollbarHide: true,
                slidesPerView: 'auto',
                centeredSlides: false,
                spaceBetween: 15,
                grabCursor: true
            });
        },
        actions: {
            displayFatie: function(image) {
                console.log('display fatie from fatie swiper', image);
            }
        }
    });

    // 自定义一个组件(相当于HTML的某个自定义标签)，可以在整个应用中可以重复使用
    // 事件都是绑在组件上，组件就有了行为能力，但这样子，其实也就没很大通用性了
    // 注意： 组件名必须包含'-'。因此blog-post是一个合法的命名，而post则不是。
    // 这样避免了与当前或者今后的HTML元素的冲突，并确保Ember能自动加载组件。
    // emberjs对原生事件做了控制：To prevent default events from being listened to
    // http://jsfiddle.net/pangratz666/QtZ2T/
    // https://github.com/emberjs/ember.js/blob/master/packages/ember-views/lib/system/event_dispatcher.js#L48-73
    App.FatieImageComponent = Ember.Component.extend({
        tagName: 'div',
        classNames: ['beitie-img-view'],
        layout: Ember.Handlebars.compile('<img src="/{{path100}}/{{image}}" class="img-responsive beitie-img"/>'),
        mouseEnter: function(event) {
            console.log(event.type);
        },
        click: function(event) {
            var $target = Ember.$(event.target);
            $target.css({
                opacity: 0.2
            });
            // var src = $target.data('src');
            // NOTICE here about Ember bug:
            // 这里需要十分小心，不能用$target.data('src')来获取jquery对象的data对象
            // 当法帖切换时，虽然src和data-src被修改了，但是jquery对象的data('src')还是原来的值，没有更新
            var src = $target.attr('src');
            if (!/1000/.test(src)) {
                src = src.replace(/100/, '1000');
            }
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

            // 可以往上层components/controller/route发送action
            this.sendAction('action', src);

            return false;
        }
    });
})();
