// fake require.js

function define(fn) {
    return fn();
}

var render = define(function(){
    var TodoList = React.createClass({
      render: function() {
        var createItem = function(itemText, index) {
          return <li key={index + itemText}>{itemText}</li>;
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
      }
    });
    var TodoApp = React.createClass({
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
          <div>
            <h3>TODO</h3>
            <div>{this.props.test1}</div>
            <div>{this.props.test2}</div>
            <TodoList items={this.props.items} />
            <TodoList items={this.state.items} />
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.onChange} value={this.state.text} />
              <button>{'Add #' + (this.state.items.length + 1)}</button>
            </form>
          </div>
        );
      }
    });

    return function() {
        var options = arguments.length ? arguments[0] : {test1: '1', test2: '2', items: [1,2,3]};
        React.render(<TodoApp {...options}/>, document.getElementById('todos'));
    };
});

console.log(render);
render();
setTimeout(function() {
    render({test1: 'test1', test2: 'test2', items: ['x', 'y', 'z']});
}, 3000);
