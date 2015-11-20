// Setup the model to work with dummy todos because we don't have a service
// Only findAll and update are used.
var TODOS = [
    {id: 1, name: "wake up", complete: true},
    {id: 2, name: "take out trash", complete: false},
    {id: 3, name: "do dishes", complete: false}
];
var Todo = can.Model.extend({
    findAll : function(){
      return $.Deferred().resolve(TODOS);
    },
    findOne : function(params){
      return $.Deferred().resolve(TODOS[(+params.id)-1]);
    },
    update  : function(id, attrs){
        // update TODOS with the new attrs
        $.extend(TODOS[id -1], attrs);
        return $.Deferred().resolve()
    },
    destroy : function(){
        return $.Deferred().resolve()
    }
},
{});

can.route("todos/:id");

// Organizes a list of todos
var Todos = can.Control.extend({
  // called when a new Todos() is created
  "init" : function( element , options ){

    // get all todos and render them with
    // a template in the element's html
    var el = this.element;
    Todo.findAll({}, function(todos){
        el.html( can.view('todosMustache', {todos: todos}) )
    });
  },
  // when a todo is clicked, create a 'selected'
  // event for others to listen to
  "li click" : function(li){
    li.trigger('selected', li.data('todo') );
  },
  // when .complete is clicked, mark the todo completed
  "li .complete click" : function(el, ev){
    el.closest('li')
      .data('todo')
      .attr('complete', el.prop('checked'))
      .save();

    ev.stopPropagation();
  },
  // when .destroy is clicked, destroy the
  // todo
  "li .destroy click" : function(el, ev){
    el.closest('li')
      .data('todo')
      .destroy();
    ev.stopPropagation();
  }
});

// Editor manages editing a todo's name
// call update on the editor like
var Editor = can.Control.extend({
  todo : function(todo){
    this.options.todo = todo;
    this.on();
    this.setName()
  },
  // a helper that sets the value of the input
  // to the todo's name
  setName : function(){
    this.element.val(this.options.todo.name);
  },
  // when the input changes
  // update the todo instance
  "change" : function(){
    var todo = this.options.todo
    todo.attr('name',this.element.val())
    todo.save();
  },
  "{todo} destroyed" : function(){
      this.element.hide();
  }
});

// Routing puts all the widget controllers together
// along with managing routes
var Routing = can.Control.extend({
  init : function(){
    this.editor = new Editor("#editor")
    this.editor.element.hide();
    new Todos("#todos");
  },
  "{can.route} id" : function(route, ev, newVal){
    $("#editor").show();
      Todo.findOne({id: newVal}, $.proxy(function(todo){
          this.editor.todo(todo);
      }, this))
  },
  "li selected" : function(el, ev, todo){
    can.route.attr('id',todo.id);
  }
});

// create routing controller
new Routing(document.body);
