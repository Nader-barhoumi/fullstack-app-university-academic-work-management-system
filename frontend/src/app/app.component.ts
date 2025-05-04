import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcademicInstitutionModule } from './academic-institution/academic-institution.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AcademicInstitutionModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
