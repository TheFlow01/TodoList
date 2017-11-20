import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  template: `
    <input class="form-control input-lg" 
          placeholder="What needs to be done?" 
          autofocus 
          [(ngModel)]="content"
          (keyup.enter)="Input()">
  `,
  styles: []
})
export class TodoFormComponent {
  content: string;
  @Output() add = new EventEmitter();
  Input(content) {
    this.add.emit(this.content);
    this.content = '';
  }

}
