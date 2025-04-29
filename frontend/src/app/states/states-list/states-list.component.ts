import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService, State } from '../state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-states-list',
  templateUrl: './states-list.component.html',
  styleUrls: ['./states-list.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class StatesListComponent implements OnInit {
  states: State[] = [];
  errorMessage: string | null = null;

  constructor(private stateService: StateService, private router: Router) {}

  ngOnInit(): void {
    this.loadStates();
  }

  loadStates(): void {
    this.stateService.getStates().subscribe({
      next: (states) => {
        this.states = states;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  editState(id: number): void {
    this.router.navigate(['/states/edit', id]);
  }

  deleteState(id: number): void {
    if (confirm('Are you sure you want to delete this state?')) {
      this.stateService.deleteState(id).subscribe({
        next: () => {
          this.loadStates();
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/states/create']);
  }
}
