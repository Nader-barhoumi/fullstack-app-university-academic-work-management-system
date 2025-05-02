import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Address } from '../../assets/common/interfaces/Address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:3000/addresses';

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createAddress(address: Partial<Address>): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address)
      .pipe(catchError(this.handleError));
  }

  updateAddress(id: number, address: Partial<Address>): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address)
      .pipe(catchError(this.handleError));
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else if (!error.status) {
      // No status code means the server is unreachable
      errorMessage = 'Unable to connect to the server. Please make sure the backend is running.';
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
        // Generic server error
        errorMessage = `Server error: ${error.status} - ${error.statusText || 'Unknown error'}`;
      }
    }

    console.error('API Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
