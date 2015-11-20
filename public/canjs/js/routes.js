define(['jquery', 'can', 'can/control/route'], function($, can) {

    // views
    var index, authors, search, faties, show;

    var Routing = can.Control({
        init: function() {
            console.log('routing init');
        },
        'route': function() {
            // Matches every routing change, but gets passed no data.
            console.log('routing changed');
        },
        ' route': function() {
            if (index) {
                index.render();
            } else {
                console.log('routing index');
                require(['js/index'], function(Index) {
                    index = new Index('#beitie-container');
                });
            }
        },
        'authors route': function() {
            if (authors) {
                authors.render();
            } else {
                require(['js/authors'], function(Authors) {
                    authors = new Authors('#beitie-container');
                });
            }
        },
        'shufa/:author route': function(params) {
            var author = params.author;
            if (faties) {
                faties.render(author);
            } else {
                require(['js/faties'], function(Faties) {
                    faties = new Faties('#beitie-container', {author: author});
                });
            }
        },
        'shufa/:author/:fatie route': function(params) {
            var author = params.author, fatie = params.fatie;
            if (show) {
                show.render(author, fatie);
            } else {
                require(['js/show'], function(Show) {
                    show = new Show('#beitie-container', {author: author, fatie, fatie});
                });
            }
        },
        'search route': function() {
            if (search) {
                search.render();
            } else {
                require(['js/search'], function(Search) {
                    search = new Search('#beitie-container');
                });
            }
        }
    });

    return {
        start: function() {
            new Routing(window);
            can.route.ready();
        }
    };
});

