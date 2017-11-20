import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <h1 class="title">Todos</h1>
        <input class="form-control input-lg" 
          placeholder="What needs to be done?" 
          autofocus 
          [(ngModel)]="content"
          (keyup.enter)="addTodo($event.target.value)">
        <ul class="nav nav-xs nav-pills">
          <li *ngFor="let item of navItems" [class.active]="item === status">
            <a (click)="toggleTab(item)">{{ item }}</a>
          </li>
        </ul>
        <ul id="todo-list" class="list-group">
          <li class="list-group-item" *ngFor="let todo of todos | todosFilter: status" (click)="toggleTodo(todo)">
            <div class="hover-anchor">
              <a class="hover-action text-muted">
                <span class="glyphicon glyphicon-remove-circle pull-right" data-id="{{ todo.id }}" (click)="removeTodo(todo.id)"></span>
              </a>
              <label class="i-checks" for="{{ todo.id }}">
                <input type="checkbox" id="{{ todo.id }}" [checked]="todo.completed"><i></i>
                <span>{{ todo.content }}</span>
              </label>
            </div>
          </li>
        </ul>
        <div class="col-xs-6">
          <label class="i-checks" style="padding-left: 20px">
            <input id="chk-allComplete" type="checkbox" (change)="toggleAll($event.target.checked)">
            <i></i>
            <span>Mark all as complete</span>
          </label>
        </div>
        <div class="col-xs-6 text-right">
          <button id="btn-removeCompletedTodos" class="btn btn-default btn-xs" (click)="clearCompleted()">Clear completed (
            <span id="completedTodos">{{ cntCompleted() }}</span> )</button>
          <strong id="leftTodos">{{ cntActive() }}</strong> {{ cntActive() > 1 ? 'items' : 'item' }} left
        </div>
      </div>
    </div>
    <pre>{{ todos | json }}</pre>
  </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  todos: Todo[];
  content: string;

  navItems = ['All', 'Active', 'Completed'];
  status = 'All';
  
  ngOnInit() {
    this.todos = this.getTodos();
  }
  getTodos() {
    return [
      { id: 1, content: 'HTML', completed: true },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];
  }

  private getLastId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  addTodo() {
    if (this.content !== '') this.todos.push({ id: this.getLastId(), content: this.content, completed: false });
    this.content = '';
  }

  toggleTodo(todo) {
    todo.completed = !todo.completed;
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
  
  toggleTab(item) {
    this.status = item;
  }
  
  toggleAll(completed: boolean) {
    this.todos = this.todos.map(todo => Object.assign(todo, { completed }));
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => todo.completed === false);
  }

  cntCompleted() {
    return this.todos.filter(todo => todo.completed).length;
  }

  cntActive() {
    return this.todos.filter(todo => !todo.completed).length;
  }
}
