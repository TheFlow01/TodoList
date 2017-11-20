import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppComponent } from './app.component';
import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list.component';
import { AddTodoComponent } from './add-todo.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoListComponent,
    AddTodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
