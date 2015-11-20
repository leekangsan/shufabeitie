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
          React.createElement("div", {className: "alert alert-info"}, "首页会随机刷出60个法帖。"), 
          React.createElement("div", {id: "beitie-imgs-container", className: "row"}, 
            this.props.faties.map(foreach)
          )
        )
        );
      }
    });

    return render(View);
});

