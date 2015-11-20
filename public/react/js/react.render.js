define(['react', 'jquery'], function(React, $) {

    return function(View) {
        return {
            render: function(options) {
                var options = options || {};
                var container = options.container || document.body;
                var callback = options.callback ? function() {
                        options.callback.apply(options, [View, React, $]);
                    } : $.noop;
                React.render(React.createElement(View, React.__spread({}, options)), $(container).get(0), callback);
            }
        }
    };

});
