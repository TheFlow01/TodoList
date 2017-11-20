import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { TodoFormComponent } from './todo-form.component';
import { TodoContainerComponent } from './todo-container.component';
import { TodosFilterPipe } from './todos-filter.pipe';
import { TodoNavComponent } from './todo-nav.component';
import { TodoListComponent } from './todo-list.component';
import { TodoFooterComponent } from './todo-footer.component';


@NgModule({
  declarations: [
    AppComponent,
    TodoFormComponent,
    TodoContainerComponent,
    TodosFilterPipe,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
