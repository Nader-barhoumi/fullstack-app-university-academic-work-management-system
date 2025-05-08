import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AcademicInstitutionService } from './academic-institution.service';
import { AcademicInstitution } from '../../assets/common/interfaces/Academic-Instituion';
import { NgForm } from '@angular/forms';
import { Address } from '../../assets/common/interfaces/Address.interface';
import { States } from '../../assets/common/enums/States.enums';
import { AddressService } from '../addresses/address.service';

@Component({
  selector: 'app-academic-institution',
  templateUrl:'./academic-institution.component.html',
  styleUrls: ['./academic-institution.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AcademicInstitutionComponent implements OnInit {
  institution: AcademicInstitution | null = null;
  editInstitution: Partial<AcademicInstitution> | null = null;
  isEditing = false;
  loading = false;
  errorMessage: string | null = null;
  isEditingAddress = false;

  constructor(
    private academicInstitutionService: AcademicInstitutionService,
    private addressService: AddressService
  ) {}

  ngOnInit() {
    this.loadInstitution();
  }

  loadInstitution() {
    this.loading = true;
    this.academicInstitutionService.getInstitution(1).subscribe(
      data => {
        // Ensure address property exists to prevent null reference errors
        if (data && !data.address) {
          data.address = {
            id: 0,
            address_details: '',
            zip_code: 0,
            state: States.KASSERINE,
          };
        }
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
      // Create a deep copy to avoid directly modifying the institution object
      this.editInstitution = {
        ...this.institution,
        phone: Number(this.institution.phone),
        fax: this.institution.fax ? Number(this.institution.fax) : undefined,
        address: this.institution.address ? {
          ...this.institution.address,
          state: this.institution.address.state as unknown as States
        } : {
          id: 0,
          address_details: '',
          zip_code: 0,
          state: States.KASSERINE,
        }
      };
      this.isEditing = true;
    }
  }

  startEditingAddress() {
    if (this.institution) {
      // Create a deep copy of the institution with the current address
      this.editInstitution = {
        ...this.institution,
        address: this.institution.address ? {
          ...this.institution.address,
          state: this.institution.address.state as unknown as States
        } : {
          id: 0,
          address_details: '',
          zip_code: 0,
          state: States.KASSERINE,
        }
      };
      this.isEditingAddress = true;
    }
  }

  onAddressUpdated(updatedAddress: Address) {
    if (this.editInstitution) {
      // First update the address in the database
      if (updatedAddress.id) {
        this.addressService.updateAddress(updatedAddress.id, updatedAddress).subscribe({
          next: (savedAddress) => {
            // Then update the institution with the new address
            this.editInstitution!.address = {
              id: savedAddress.id || 0,
              address_details: savedAddress.address_details,
              zip_code: savedAddress.zip_code || 0,
              state: savedAddress.state || States.KASSERINE,
              city: savedAddress.city,
              additional_details: savedAddress.additional_details
            };
            this.isEditingAddress = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to update address. Please try again.';
            console.error('Error updating address:', error);
          }
        });
      } else {
        // Create new address
        this.addressService.createAddress(updatedAddress).subscribe({
          next: (newAddress) => {
            // Then update the institution with the new address
            this.editInstitution!.address = {
              id: newAddress.id || 0,
              address_details: newAddress.address_details,
              zip_code: newAddress.zip_code || 0,
              state: newAddress.state || States.KASSERINE,
              city: newAddress.city,
              additional_details: newAddress.additional_details
            };
            this.isEditingAddress = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to create address. Please try again.';
            console.error('Error creating address:', error);
          }
        });
      }
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.isEditingAddress = false;
    this.editInstitution = null;
    this.errorMessage = null;
  }

  updateInstitution(form: NgForm) {
    if (form.valid && this.editInstitution) {
      this.academicInstitutionService.updateInstitution(1, this.editInstitution).subscribe(
        data => {
          // Ensure address property exists in the response
          if (data && !data.address) {
            data.address = {
              id: 0,
              address_details: '',
              zip_code: 0,
              state: States.KASSERINE,
            };
          }
          this.institution = data;
          this.isEditing = false;
          this.isEditingAddress = false;
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
