import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';


@Component({
  selector: 'app-todo-container',
  template: `
    <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <h1 class="title">Todos</h1>

        <app-todo-form (add)="addTodo($event)"></app-todo-form>

        <app-todo-nav [navItems]="navItems" [status]="status" (toggleTab)="toggleTab($event)"></app-todo-nav>

        <app-todo-list [todos]="todos" [status]="status" (toggleTodo)="toggleTodo($event)" (removeTodo)="removeTodo($event)"></app-todo-list>

        <app-todo-footer [cntCompleted]="cntCompleted()" [cntActive]="cntActive()" (toggleAll)="toggleAll($event)" (clearCompleted)="clearCompleted($event)"></app-todo-footer>
        
        <div class="col-md-12" style="margin-top: 30px">
          <pre>{{ todos | json }}</pre>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class TodoContainerComponent implements OnInit {
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

  addTodo(content) {
    if (content !== '') this.todos.push({ id: this.getLastId(), content, completed: false });
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
