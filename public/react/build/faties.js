define(['react', 'js/react.render', 'jquery'], function(React, render, $) {
    var View = React.createClass({displayName: "View",
      render: function() {
        var foreach = function(fatie, index) {
          return (
            React.createElement("div", {className: "col-md-4 col-sm-6", key: index}, 
              React.createElement("div", {className: "thumbnail"}, 
                React.createElement("div", {className: "caption ellipsis"}, React.createElement("a", {href: "#/" + fatie.value}, index + 1, ". ", fatie.key))
              )
            )
          );
        };

        return (
          React.createElement("div", null, 
            React.createElement("ol", {className: "alert alert-info breadcrumb"}, 
              React.createElement("li", null, React.createElement("a", {href: "#/authors"}, "历代名家")), 
              React.createElement("li", {className: "active"}, this.props.author)
            ), 
            React.createElement("div", {id: "beitie-list", className: "row"}, 
                this.props.papers.map(foreach)
            )
          )
        );
      }
    });

    return render(View);
});


