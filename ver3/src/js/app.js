import axios from 'axios';

let todos;
const input = document.getElementById('input-todo');
const list = document.getElementById('todo-list');

const getId = function () {
  return todos ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
};

const render = function () {
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

const getTodos = function () {
  axios.get('/todos')
    .then(res => {
      todos = res.data;
      render();
      console.log('[GET]\n', todos);
    })
    .catch(err => console.log(err.response));
};

const addTodos = function () {
  const content = input.value;
  input.value = '';

  let todo;

  if (!todos || !todos.length) {
    todo = { id: 1, content, completed: false };
  } else {
    todo = { id: getId(), content, completed: false };
  }

  axios.post('/todos', todo)
    .then(res => {
      console.log('[ADD]\n', res.data);
      getTodos();
    })
    .catch(err => console.log(err.response));
};

const toggleTodoComplete = function (id) {
  // 파라미터로 전달받은 id로 todo를 검색한 후, todo의 completed 프로퍼티의 값을 취득
  const { completed } = todos.find(todo => todo.id == id);
  axios.patch(`/todos/${id}`, { completed: !completed })
    .then(res => {
      console.log('[TOGGLE]\n', res.data);
      getTodos();
    })
    .catch(err => console.log(err.response));
};

const removeTodo = function (id) {
  axios.delete(`/todos/${id}`)
    .then(res => {
      console.log('[DELETE]\n', res.data);
      getTodos();
    })
    .catch(err => console.log(err.response));
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