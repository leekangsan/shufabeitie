define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
    var View = React.createClass({displayName: "View",
      render: function() {
        var foreach = function(author, index) {
          return (
            React.createElement("div", {className: "col-md-3 col-xs-6", key: index}, 
              React.createElement("div", {className: "thumbnail"}, 
                React.createElement("div", {className: "caption ellipsis"}, React.createElement("a", {href: "#/shufa/" + author}, index + 1, ". ", author))
              )
            )
          );
        };

        return (
          React.createElement("div", null, 
            React.createElement("div", {className: "alert alert-info"}, "中国历史上的书法名家列表。"), 
            React.createElement("form", {className: "form author-form form-horizontal alert alert-warning"}, 
              React.createElement("div", {className: "row"}, 
                React.createElement("div", {className: "col-md-6 col-sm-12"}, 
                  React.createElement("div", {className: "input-group"}, 
                    React.createElement("input", {id: "author-query", className: "form-control", placeholder: "历代书法名家"}), 
                    React.createElement("span", {className: "input-group-btn"}, 
                      React.createElement("button", {className: "btn btn-default"}, "过滤")
                    )
                  )
                )
              )
            ), 
            React.createElement("div", {className: "row", id: "beitie-authors"}, 
              this.props.authors.map(foreach)
            )
          )
        );
      }
    });

    return render(View);
});

