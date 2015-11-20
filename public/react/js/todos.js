// fake require.js

var modules = [];

function require(module_name) {
    return modules[module_name];
}
function define(module_name, fn) {
    modules[module_name] = fn();
}

define('render', function(){
    var TodoList = React.createClass({displayName: "TodoList",
      render: function() {
        var createItem = function(itemText, index) {
          return React.createElement("li", {key: index + itemText}, itemText);
        };
        return React.createElement("ul", null, this.props.items.map(createItem));
      }
    });
    var TodoApp = React.createClass({displayName: "TodoApp",
      getInitialState: function() {
        return {items: [], text: ''};
      },
      onChange: function(e) {
        this.setState({text: e.target.value});
      },
      handleSubmit: function(e) {
        e.preventDefault();
        var nextItems = this.state.items.concat([this.state.text]);
        var nextText = '';
        this.setState({items: nextItems, text: nextText});
      },
      render: function() {
        return (
          React.createElement("div", null,
            React.createElement("h3", null, "TODO"),
            React.createElement("div", null, this.props.test1),
            React.createElement("div", null, this.props.test2),
            React.createElement(TodoList, {items: this.props.items}),
            React.createElement(TodoList, {items: this.state.items}),
            React.createElement("form", {onSubmit: this.handleSubmit},
              React.createElement("input", {onChange: this.onChange, value: this.state.text}),
              React.createElement("button", null, 'Add #' + (this.state.items.length + 1))
            )
          )
        );
      }
    });

    var View = TodoApp;
    return {
        render: function(options) {
            var options = options || {};
            var container = options.container || document.body;
            var callback = options.callback ? function() {
                    options.callback.apply(options, [View, React]);
                } : function(){};
            React.render(React.createElement(View, React.__spread({}, options)), container, callback);
        }
    }
});

var ReactView = require('render');
console.log(ReactView);
ReactView.render({container: document.getElementById('todos'), test1: 'react1', test2: 'react2', items: ['1', '2', '3']});
setTimeout(function() {
    ReactView.render({container: document.getElementById('todos'), test1: 'test1', test2: 'test2', items: ['x', 'y', 'z']});
}, 3000);
