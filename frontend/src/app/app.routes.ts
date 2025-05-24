import { Routes } from '@angular/router';

import { AddressesListComponent } from './addresses/address-list/addresses-list.component';
import { AddressFormComponent } from './addresses/address-form/address-form.component';

export const routes: Routes = [
  { path: 'addresses', component: AddressesListComponent },
  { path: 'addresses/create', component: AddressFormComponent },
  { path: 'addresses/edit/:id', component: AddressFormComponent },
  {path: '', redirectTo: 'uni', pathMatch: 'full'},
  {path: 'uni', component: AddressesListComponent}, 
];
