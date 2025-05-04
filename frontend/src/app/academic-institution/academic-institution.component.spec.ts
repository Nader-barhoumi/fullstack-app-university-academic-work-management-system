import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicInstitutionComponent } from './academic-institution.component';

describe('AcademicInstitutionComponent', () => {
  let component: AcademicInstitutionComponent;
  let fixture: ComponentFixture<AcademicInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicInstitutionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcademicInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
