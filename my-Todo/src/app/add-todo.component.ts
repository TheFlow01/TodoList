import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  template: `
    <input type="text" placeholder="input your todos" [(ngModel)]="content" (keyup.enter)="Input()">
  `,
  styles: [`
    :host {
      display: block;
      padding: 16px 16px 16px 10px;
      background-color: white;
    }

    input {
      display: inline-block;
      font-size: 18px;
      border: none;
    }

    input:focus {
      outline: none;
    }
  `]
})
export class AddTodoComponent {
  content: string;
  @Output() add = new EventEmitter();

  Input(content) {
    this.add.emit(this.content);
    this.content = '';
  }

}
