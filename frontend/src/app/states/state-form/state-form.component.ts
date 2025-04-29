import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService, State } from '../state.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-state-form',
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StateFormComponent implements OnInit {
  state: State = { id: 0, name: '', code: '' };
  isEditMode = false;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.stateService.getState(+id).subscribe({
        next: (state) => {
          this.state = state;
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error fetching state:', error);
        }
      });
    }
  }

  onSubmit(): void {
    // Reset error message
    this.errorMessage = null;

    // Convert code to uppercase before submitting
    this.state.code = this.state.code.toUpperCase();

    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    const request = this.isEditMode
      ? this.stateService.updateState(this.state.id, this.state)
      : this.stateService.createState(this.state);

    request.subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/states']);
      },
      error: (error: Error | HttpErrorResponse) => {
        this.isSubmitting = false;

        // Use the error message that was already processed by the service
        this.errorMessage = error.message;

        // Log the full error for debugging
        console.error('Form submission error:', error);
      }
    });
  }

  validateForm(): boolean {
    if (!this.state.name.trim()) {
      this.errorMessage = 'Name is required';
      return false;
    }

    if (this.state.name.length > 30) {
      this.errorMessage = 'Name must be 30 characters or less';
      return false;
    }

    if (!this.state.code) {
      this.errorMessage = 'Code is required';
      return false;
    }

    if (this.state.code.length !== 2) {
      this.errorMessage = 'Code must be exactly 2 characters';
      return false;
    }

    // Check if code contains only uppercase letters
    if (!/^[A-Z]{2}$/.test(this.state.code)) {
      this.errorMessage = 'Code must be exactly two uppercase letters (A-Z)';
      return false;
    }

    return true;
  }

  cancel(): void {
    this.router.navigate(['/states']);
  }
}
