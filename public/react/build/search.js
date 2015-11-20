define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
    var View = React.createClass({displayName: "View",
      render: function() {
        var foreach = function(fatie, index) {
          return (
            React.createElement("div", {className: "col-md-4 col-sm-6", key: index}, 
              React.createElement("div", {className: "thumbnail"}, 
                React.createElement("div", {className: "caption ellipsis"}, React.createElement("a", {href: "#/shufa/" + fatie.author + "/" + fatie.paper}, index + 1, ". ", fatie.paper))
              )
            )
          );
        };

        return (
          React.createElement("div", null, 
            React.createElement("div", {className: "alert alert-info"}, 
              "输入书法作品名或者是书法家的名字进行搜索，最多返回120个结果。"
            ), 
            React.createElement("form", {className: "form search-form alert alert-warning"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6 col-sm-12"}, 
                  React.createElement("div", {className: "input-group"}, 
                    React.createElement("input", {type: "text", name: "keywords", id: "keywords", className: "form-control", placeholder: "书法作品名或者是书法家"}), 
                    React.createElement("span", {className: "input-group-btn"}, 
                      React.createElement("input", {type: "submit", value: "搜索", className: "btn btn-default"})
                    )
                  )
                )
              )
            ), 
            React.createElement("div", {id: "beitie-imgs-container", className: "row"}, 
              this.props.faties.map(foreach)
            )
          )
        );
      }
    });

    return render(View);
});


