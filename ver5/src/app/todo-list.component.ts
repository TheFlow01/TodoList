import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  template: `
    <ul id="todo-list" class="list-group">
      <li class="list-group-item" *ngFor="let todo of todos | todosFilter: status" (click)="toggleTodo.emit(todo)">
        <div class="hover-anchor">
          <a class="hover-action text-muted">
            <span class="glyphicon glyphicon-remove-circle pull-right" data-id="{{ todo.id }}" (click)="removeTodo.emit(todo.id)"></span>
          </a>
          <label class="i-checks" [for]="todo.id">
            <input type="checkbox" [id]="todo.id" [checked]="todo.completed"><i></i>
            <span>{{ todo.content }}</span>
          </label>
        </div>
      </li>
    </ul>
  `,
  styles: []
})
export class TodoListComponent {
  @Input() todos;
  @Input() status;
  @Output() toggleTodo = new EventEmitter();
  @Output() removeTodo = new EventEmitter();

}
