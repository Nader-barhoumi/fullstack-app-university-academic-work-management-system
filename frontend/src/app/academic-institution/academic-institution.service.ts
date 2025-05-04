import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AcademicInstitution } from '../../assets/common/interfaces/Academic-Instituion';

@Injectable({
  providedIn: 'root'
})
export class AcademicInstitutionService {
  private apiUrl = 'http://localhost:3000/academic-institution';

  constructor(private http: HttpClient) {}

  getInstitution(): Observable<AcademicInstitution> {
    return this.http.get<AcademicInstitution>(this.apiUrl);
  }

  updateInstitution(institution: Partial<AcademicInstitution>): Observable<AcademicInstitution> {
    return this.http.put<AcademicInstitution>(this.apiUrl, institution);
  }
}
