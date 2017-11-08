import axios from 'axios';

(function () {
  let todos;
  const todoList = document.querySelector('#todo-list');
  const input = document.getElementById('input-todo');
  const list = document.getElementById('todo-list');
  const clearBtn = document.getElementById('btn-removeCompletedTodos');
  const toggleCompleted = document.querySelector('#chk-allComplete');
  const toggleTab = document.querySelector('.nav-pills');

  const countCompleted = function () {
    return todos.filter(todo => todo.completed === true).length;
  };

  const filterStatus = function () {
    const status = document.querySelector('.active').id;
    if (status === 'active') {
      return todos.filter(todo => todo.completed === false);
    }
    if (status === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }
    return todos;
  };

  const render = function () {
    todoList.innerHTML = '';
    filterStatus().forEach(todo => {
      const checked = todo.completed ? 'checked' : '';
      todoList.innerHTML += `<li class="list-group-item">
        <div class="hover-anchor"> 
            <a class="hover-action text-muted"> 
                <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${todo.id}"></span> 
            </a> 
            <label class="i-checks" for="${todo.id}"> 
                <input type="checkbox" id="${todo.id}" ${checked}><i></i> 
                <span>${todo.content}</span> 
            </label> 
        </div> 
    </li>`;
    });
    document.querySelector('#completedTodos').innerHTML = `${countCompleted()}`;
    document.querySelector('#leftTodos').innerHTML = `${todos.length - countCompleted()}`;
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

  const getId = function () {
    return todos ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
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

  const removeTodo = function (id) {
    axios.delete(`/todos/id/${id}`)
      .then(res => {
        console.log('[DELETE]\n', res.data);
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

  const toggleAll = function (completed) {
    axios.patch('/todos', completed)
      .then(res => {
        console.log('[TOGGLE ALL]\n', res.data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  const removeAll = function () {
    axios.delete('/todos/completed/')
      .then(res => {
        console.log('[DELETEALL]\n', res.data);
        getTodos();
      })
      .catch(err => console.log(err.response));
  };

  window.addEventListener('load', getTodos);

  input.addEventListener('keyup', e => {
    if (e.keyCode === 13 && input.value !== '') addTodos();
  });

  list.addEventListener('change', e => {
    toggleTodoComplete(e.target.id);
  });

  list.addEventListener('click', e => {
    if (e.target.parentNode.nodeName !== 'LABEL' && e.target.nodeName === 'SPAN') removeTodo(e.target.dataset.id);
  });

  clearBtn.addEventListener('click', () => {
    removeAll();
  });

  toggleCompleted.addEventListener('click', e => {
    const completed = e.target.checked;
    toggleAll({ completed });
  });

  toggleTab.addEventListener('click', e => {
    if (e.target.nodeName === 'A') {
      document.querySelectorAll('.nav-pills > li').forEach(tab => {
        tab.className = '';
        e.target.parentNode.className = 'active';
      });
      render();
    }
  });
}());

