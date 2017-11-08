/* eslint-enable */

var todos;
var input = document.getElementById('input-todo');
var list = document.getElementById('todo-list');

var getTodos = function() {
  todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
  ];
  render();
};

var addTodos = function() {
  var data = input.value;
  if (!todos) {
    todos = [{ id: 1, content: data, completed: false }];
  } else {
    todos = [{ id: getId(), content: data, completed: false }].concat(todos);
  }
  input.value = '';
  render();
};

var removeTodo = function(id) {
  todos = todos.filter(function(todo) {
    return todo.id != id;
  });
  render();
}

var toggleTodoComplete = function(id) {
  todos = todos.map(function(todo) {
    return todo.id == id ? Object.assign({}, todo, { completed: !todo.completed }) : todo;
  });
  render();
  console.log('[TOGGLE-COMP]\n', todos);
};

var getId = function() {
  if (todos.length === 0) {
    return 1;
  }
  return todos.reduce(function(accu, curr) {
    if (accu.id > curr.id) {
      return accu;
    } else {
      return curr;
    }
  }).id + 1;
};

var render = function() {
  var html = '';

  todos.forEach(function(todo) {
    var checked = todo.completed ? 'checked' : '';
    html += '<li class="list-group-item"> \
        <div class="hover-anchor"> \
            <a class="hover-action text-muted"> \
                <span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + todo.id + '"></span> \
            </a> \
            <label class="i-checks" for="' + todo.id + '"> \
                <input type="checkbox" id="' + todo.id + '"' + checked + '><i></i> \
                    <span>' + todo.content + '</span> \
            </label> \
        </div> \
    </li>';
  });

  list.innerHTML = html;
};

window.addEventListener('load', function() {
  getTodos();
});

input.addEventListener('keyup', function(e) {
  if (e.keyCode !== 13 || input.value === '') return;
  addTodos();
});

list.addEventListener('change', function(e) {
  toggleTodoComplete(e.target.id);
});

list.addEventListener('click', function(e) {
  if (e.target.parentNode.nodeName !== 'LABEL' && e.target.nodeName == 'SPAN') {
    removeTodo(e.target.dataset.id);
  }
});