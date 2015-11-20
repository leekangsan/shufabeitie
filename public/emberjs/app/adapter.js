(function() {

    App.ApplicationAdapter = DS.Adapter.extend({
        namespace: "shufabeitie-emberjs",
        shouldReloadAll: function() {
            // console.log(arguments);
            return true;
        },
        shouldBackgroundReloadRecord: function() {
            return false;
        },
        findRecord: function(store, type, id) {
            // findRecord方法会在store里查找对应id的记录，有则直接返回store里的记录
            // 如果在store里没有找到，则会利用下面的ajax进行服务端的访问，并会将ajax
            // 返回的结果push到store中
            var url = id;
            var name = type.modelName;
            if (name == 'show') {
                // 指定法帖的详细信息
                return Ember.$.getJSON(url).then(function(data) {
                    data.id = id;
                    data.published = 'hide';
                    data.cover = data.images[0];
                    if (data.info) {
                        if (data.info.published) {
                            data.published = 'show';
                        }
                        if (data.info.text) {
                            data.info.html = ('<p>' + data.info.text.trim().replace(/\n/g, '<p>'));
                        } else {
                            data.info.html = '<p></p>';
                        }
                    }
                    return data;
                });
            } else if (name == 'fatie') {
                // 指定书法家的全部法帖
                return Ember.$.getJSON(url).then(function(data) {
                    return {
                        id: id,
                        faties: data,
                        type: 'fatie'
                    };
                });
            }
        },
        createRecord: function() {
            // console.log(arguments);
            return true;
        },
        updateRecord: function() {
            // console.log(arguments);
            return true;
        },
        deleteRecord: function() {
            // console.log(arguments);
            return true;
        },
        query: function(store, type, query) {
            var name = type.modelName;
            if (name == 'beitie') {
                // 搜索结果页
                return Ember.$.post('/search', query).then(function(beities) {
                    return beities.map(function(beitie) {
                        beitie.id = beitie.paper;
                        beitie.type = 'beitie';
                        return beitie;
                    });
                });
            }
        },
        findAll: function(store, type) {
            // console.log(arguments);
            var name = type.modelName;
            if (name == 'beitie') {
                // 首页
                var stored = store.peekAll('beitie');
                var exists = stored.content.length;
                if (exists) {
                    // return cache
                    return stored.content;
                }
                return Ember.$.getJSON('/').then(function(beities) {
                    return beities.map(function(beitie) {
                        beitie.id = beitie.paper;
                        beitie.type = 'beitie';
                        // store.push({data: beitie});
                        return beitie;
                    });
                });
            } else if (name == 'author') {
                // 全部书法家
                var stored = store.peekAll('author');
                var exists = stored.content.length;
                if (exists) {
                    // return cache
                    return stored.content;
                }
                return Ember.$.getJSON('/shufa/').then(function(authors) {
                    var index = 0;
                    return authors.map(function(name) {
                        return {
                            name: name,
                            id: index++,
                            type: 'author'
                        }
                    });
                });
            } else {
                console.error('model name is', name);
            }
        }
    });

    App.Beitie = DS.Model.extend({
        author: DS.attr('string'),
        paper: DS.attr('string')
    });
    App.Author = DS.Model.extend({
        name: DS.attr('string')
    });
    App.Fatie = DS.Model.extend({
        author: DS.attr('string'),
        faties: DS.attr()
    });
    App.Show = DS.Model.extend({
        images: DS.attr(),
        info: DS.attr(),
        next: DS.attr('string'),
        cover: DS.attr('string'),
        author: DS.attr('string'),
        paper: DS.attr('string'),
        path100: DS.attr('string'),
        path1000: DS.attr('string'),
        prev: DS.attr('string'),
        title: DS.attr('string')
    });

})();
