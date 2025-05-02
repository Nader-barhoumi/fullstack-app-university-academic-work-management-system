import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../address.service';
import { Address } from '../../../assets/common/interfaces/Address.interface';
import { States } from '../../../assets/common/enums/States.enums';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;
  addressId?: number;
  isEditMode = false;
  errorMessage: string | null = null;
  // Convert States enum to an array of values for the dropdown
  states = Object.values(States).filter(value => typeof value === 'string').sort();

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    // Check if we're in edit mode by looking for an ID in the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.addressId = +id;
      this.isEditMode = true;
      this.loadAddress(this.addressId);
    }
  }

  private initForm(): void {
    this.addressForm = this.fb.group({
      address_details: ['', [Validators.required]],
      zip_code: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      city: [''],
      state: [null, [Validators.required]],
      additional_details: ['']
    });
  }

  private loadAddress(id: number): void {
    this.addressService.getAddress(id).subscribe({
      next: (address) => {
        this.addressForm.patchValue({
          address_details: address.address_details,
          zip_code: address.zip_code,
          city: address.city,
          state: address.state,
          additional_details: address.additional_details || ''
        });
      },
      error: (error) => {
        this.errorMessage = `Failed to load address: ${error.message}`;
        console.error('Error loading address:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    const addressData = this.addressForm.value as Partial<Address>;

    // Convert zip_code from string to number to match backend expectations
    if (addressData.zip_code) {
      addressData.zip_code = +addressData.zip_code;
    }

    if (this.isEditMode && this.addressId) {
      // Update existing address
      this.addressService.updateAddress(this.addressId, addressData).subscribe({
        next: () => {
          this.router.navigate(['/addresses']);
        },
        error: (error) => {
          this.errorMessage = `Failed to update address: ${error.message}`;
          console.error('Error updating address:', error);
        }
      });
    } else {
      // Create new address
      this.addressService.createAddress(addressData).subscribe({
        next: () => {
          this.router.navigate(['/addresses']);
        },
        error: (error) => {
          this.errorMessage = `Failed to create address: ${error.message}`;
          console.error('Error creating address:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/addresses']);
  }
}
