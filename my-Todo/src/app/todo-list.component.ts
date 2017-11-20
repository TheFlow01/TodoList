import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Todo } from './todo'

@Component({
  selector: 'app-todo-list',
  template: `
    <div *ngFor="let todo of todos" (click)="toggleTodo(todo)">
      <input type="checkbox" [checked]="todo.completed" autofocus>
      <label>{{ todo.content }}</label>
      <button (click)="removeTodo.emit(todo.id)">X</button>
    </div>
  `,
  styles: [`
    div {
      display: block;
      padding: 16px;
      color: darkgray;
      background-color: white;
      border-bottom: 1px solid #cccccc;
    }
    
    input {
      position: relative;
      
    }

    input:before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: white;
      border-radius: 20px;
      position: absolute;
      top: -6px;
      left: -8px;
      border: 1px solid dimgray;
    }

    input:checked:after {
      content: '\\2713';
      display: inline-block;
      font-size: 18px;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      position: absolute;
      top: -6px;
      left: -8px;
      border: 1px solid dimgray;
      background-color: dimgray;
      text-align: center;
      color: white;
    }

    input:checked + label {
      text-decoration: line-through;
    }

    button {
      display: inline-block;
      height : 20px;
      position: relative;
      color: white;
      float: right;
      background-color: blue;
      border: 1px solid dimgray;
      outline: none;
    }
    
  `]
})
export class TodoListComponent {
  @Input() todos: Todo[];
  @Output() removeTodo = new EventEmitter();
  

  toggleTodo(todo) {
    todo.completed = !todo.completed;
  }
}
