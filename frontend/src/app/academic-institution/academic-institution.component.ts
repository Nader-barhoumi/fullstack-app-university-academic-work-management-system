import { Component, OnInit } from '@angular/core';
import { AcademicInstitutionService } from './academic-institution.service';
import { AcademicInstitution } from '../../assets/common/interfaces/Academic-Instituion';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-academic-institution',
  templateUrl:'./academic-institution.component.html',
  styleUrls: ['./academic-institution.component.css']
})
export class AcademicInstitutionComponent implements OnInit {
  institution: AcademicInstitution | null = null;
  editInstitution: Partial<AcademicInstitution> | null = null;
  isEditing = false;
  loading = false;
  errorMessage: string | null = null;

  constructor(private academicInstitutionService: AcademicInstitutionService) {}

  ngOnInit() {
    this.loadInstitution();
  }

  loadInstitution() {
    this.loading = true;
    this.academicInstitutionService.getInstitution().subscribe(
      data => {
        this.institution = data;
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Failed to load institution data. Please try again.';
        this.loading = false;
        console.error('Error:', error);
      }
    );
  }

  startEditing() {
    if (this.institution) {
      this.editInstitution = { ...this.institution };
      this.isEditing = true;
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.editInstitution = null;
    this.errorMessage = null;
  }

  updateInstitution(form: NgForm) {
    if (form.valid && this.editInstitution) {
      this.academicInstitutionService.updateInstitution(this.editInstitution).subscribe(
        data => {
          this.institution = data;
          this.isEditing = false;
          this.editInstitution = null;
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error.error.message || 'Failed to update institution. Please try again.';
          console.error('Error:', error);
        }
      );
    }
  }
}
