import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface State {
  id: number;
  name: string;
  code: string;
}

// Create DTO without ID for creating new states
export interface CreateStateDto {
  name: string;
  code: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'http://localhost:3000/states'; // Adjust port if needed

  constructor(private http: HttpClient) {}

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getState(id: number): Observable<State> {
    return this.http.get<State>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createState(state: State): Observable<State> {
    // Create a new object without the id property
    const { name, code } = state;
    const createDto: CreateStateDto = { name, code };

    return this.http.post<State>(this.apiUrl, createDto).pipe(
      catchError(this.handleError)
    );
  }

  updateState(id: number, state: State): Observable<State> {
    // For updates, create an object without the id property
    const { name, code } = state;
    const updateDto = { name, code };

    return this.http.put<State>(`${this.apiUrl}/${id}`, updateDto).pipe(
      catchError(this.handleError)
    );
  }

  deleteState(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else if (!error.status) {
      // No status code means the server is unreachable
      errorMessage = 'Unable to connect to the server. Please make sure the backend is running.';
      console.error('Connection error:', error);
    } else {
      // Server-side error
      if (error.error && typeof error.error === 'object') {
        if (error.error.message) {
          // Use the specific error message from NestJS
          errorMessage = Array.isArray(error.error.message)
            ? error.error.message.join(', ')
            : error.error.message;
        } else if (error.error.error) {
          // Some APIs nest the error message
          errorMessage = error.error.error;
        }
      } else if (typeof error.error === 'string' && error.error) {
        // If error.error is a string, use it directly
        errorMessage = error.error;
      } else {
        // Generic server error with more details
        errorMessage = `Server error: ${error.status} - ${error.statusText || 'Unknown error'}`;
        console.log('Full error details:', error);
      }
    }

    console.error('API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}

