import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcademicInstitutionComponent } from './academic-institution.component';
import { AddressCardComponent } from '../addresses/address-card/address-card.component';
import { AddressFormComponent } from '../addresses/address-form/address-form.component';

@NgModule({
  declarations: [
    AcademicInstitutionComponent,
    AddressCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AddressFormComponent
  ],
  exports: [
    AcademicInstitutionComponent
  ]
})
export class AcademicInstitutionModule { }