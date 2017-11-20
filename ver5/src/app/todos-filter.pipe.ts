import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(todos: any, status?: string): any {
    if (!todos) return;

    if (status === 'Active') {
      return todos.filter(todo => todo.completed === false);
    }

    if (status === 'Completed') {
      return todos.filter(todo => todo.completed === true);
    }
    return todos;
  }

}
