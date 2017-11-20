import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  template: `
    <div class="col-xs-6">
      <label class="i-checks" style="padding-left: 20px">
        <input id="chk-allComplete" type="checkbox" (change)="onToggle($event.target.checked)">
        <i></i>
        <span>Mark all as complete</span>
      </label>
    </div>
    <div class="col-xs-6 text-right">
      <button id="btn-removeCompletedTodos" class="btn btn-default btn-xs" (click)="onClear()">Clear completed (
        <span id="completedTodos">{{ cntCompleted }}</span> )</button>
      <strong id="leftTodos">{{ cntActive }}</strong> {{ cntActive > 1 ? 'items' : 'item' }} left
    </div>
  `,
  styles: []
})
export class TodoFooterComponent {
  @Input() cntCompleted: number;
  @Input() cntActive: number;
  @Output() clearCompleted = new EventEmitter();
  @Output() toggleAll = new EventEmitter();
  onToggle (checked) {
    this.toggleAll.emit(checked);
  }
  onClear () {
    this.clearCompleted.emit();
  }
}
