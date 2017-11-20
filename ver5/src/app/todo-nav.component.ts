import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-nav',
  template: `
    <ul class="nav nav-xs nav-pills">
      <li *ngFor="let item of navItems" [class.active]="item === status">
        <a (click)="toggleTab.emit(item)">{{ item }}</a>
      </li>
    </ul>
  `,
  styles: []
})
export class TodoNavComponent{
  @Input() navItems;
  @Input() status;
  @Output() toggleTab = new EventEmitter();

}
