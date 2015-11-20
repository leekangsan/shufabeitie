define(['can'], function(can) {

    return can.Model({
        findAll: function() {
            return $.getJSON('/');
        },
        authors: function() {
            return $.getJSON('/shufa/');
        }
    }, {});

});
