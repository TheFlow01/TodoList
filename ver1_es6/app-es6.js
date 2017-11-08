let todos;
const input = document.getElementById('input-todo');
const list = document.getElementById('todo-list');

const getId = function() {
  return todos ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};

const render = function() {
  let html = '';

  todos.forEach(({ id, content, completed }) => {
    const checked = completed ? 'checked' : '';
    html += `<li class="list-group-item">
        <div class="hover-anchor"> 
            <a class="hover-action text-muted"> 
                <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${id}"></span> 
            </a> 
            <label class="i-checks" for="${id}"> 
                <input type="checkbox" id="${id}" ${checked}><i></i> 
                <span>${content}</span> 
            </label> 
        </div> 
    </li>`;
  });

  list.innerHTML = html;
};

const getTodos = function() {
  todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false },
  ];
  render();
};

const addTodos = function() {
  const data = input.value;
  if (todos.length === 0) {
    todos.push({ id: 1, content: data, completed: false });
    render();
    input.value = '';
  } else {
    todos = [{ id: getId(), content: data, completed: false }, ...todos];
    render();
    input.value = '';
  }
};

const toggleTodoComplete = function(id) {
  todos = todos.map(todo => (todo.id === Number(id) ? Object.assign({}, todo, { completed: !todo.completed }) : todo));
  render();
};

const removeTodo = function(id) {
  todos = todos.filter(todo => todo.id !== Number(id));
  render();
};

window.addEventListener('load', () => {
  getTodos();
});

input.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && input.value !== '') addTodos();
});

list.addEventListener('change', (e) => {
  toggleTodoComplete(e.target.id);
});

list.addEventListener('click', (e) => {
  if (e.target.parentNode.nodeName !== 'LABEL' && e.target.nodeName === 'SPAN') removeTodo(e.target.dataset.id);
});