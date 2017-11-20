import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todos',
  template: `
    <div class="title">
      <h1>Todos</h1>
      <h2>{{ today | date: 'y년 MM월 dd일' }}</h2>
    </div>
    <div>
      <app-add-todo (add)="addTodo($event)"></app-add-todo>
    </div>
    <div>
      <app-todo-list [todos]="todos" (removeTodo)="removeTodo($event)" ></app-todo-list>
    </div>
    <pre>{{ todos | json }}</pre>
  `,
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  today = new Date();
  todos: Todo[];
  content: string;

  ngOnInit() {
    this.todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }      
    ];
  }
  
  addTodo(content) {
    if(content !== '') this.todos = [...this.todos, { id: this.getLastId(), content, completed: false }];
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  private getLastId(): number {
    return this.todos.length ? Math.max(...this.todos.map(({ id }) => id)) + 1 : 1;
  }

  
}
