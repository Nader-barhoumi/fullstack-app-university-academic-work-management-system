import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StatesListComponent } from './states-list/states-list.component';
import { StateFormComponent } from './state-form/state-form.component';

@NgModule({
  declarations: [
    StatesListComponent,
    StateFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    StatesListComponent,
    StateFormComponent
  ]
})
export class StatesModule { }
