import { Routes } from '@angular/router';
import { StatesListComponent } from './states/states-list/states-list.component';
import { StateFormComponent } from './states/state-form/state-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/states', pathMatch: 'full' },
  { path: 'states', component: StatesListComponent },
  { path: 'states/create', component: StateFormComponent },
  { path: 'states/edit/:id', component: StateFormComponent }
];
