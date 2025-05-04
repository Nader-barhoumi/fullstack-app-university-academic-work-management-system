import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademicInstitutionComponent } from './academic-institution.component';

@NgModule({
  declarations: [
    AcademicInstitutionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AcademicInstitutionComponent
  ]
})
export class AcademicInstitutionModule { }
