import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() set address(value: Address | undefined) {
    if (value) {
      this._address = {
        ...value,
        state: typeof value.state === 'string' ? value.state as States : value.state
      };
    } else {
      this._address = undefined;
    }
  }
  get address(): Address | undefined {
    return this._address;
  }
  private _address?: Address;

  @Output() addressUpdated = new EventEmitter<Address>();
  @Output() cancel = new EventEmitter<void>();

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

    if (this.address) {
      this.isEditMode = true;
      this.addressId = this.address.id;
      this.addressForm.patchValue({
        address_details: this.address.address_details || '',
        zip_code: this.address.zip_code || null,
        city: this.address.city || '',
        state: this.address.state ? (this.address.state as States) : States.KASSERINE,
        additional_details: this.address.additional_details || ''
      });
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.addressId = +id;
        this.isEditMode = true;
        this.loadAddress(this.addressId);
      }
    }
  }

  private initForm(): void {
    this.addressForm = this.fb.group({
      address_details: ['', [Validators.required]],
      zip_code: [null, [Validators.required, Validators.pattern(/^\d{4}$/)]],
      city: [''],
      state: [States.KASSERINE, [Validators.required]],
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

    const formValue = this.addressForm.value;
    const addressData: Partial<Address> = {
      address_details: formValue.address_details,
      zip_code: formValue.zip_code ? +formValue.zip_code : undefined,
      city: formValue.city,
      state: formValue.state,
      additional_details: formValue.additional_details
    };

    if (this.isEditMode && this.addressId) {
      // Update existing address
      this.addressService.updateAddress(this.addressId, addressData).subscribe({
        next: (updatedAddress) => {
          if (this.address) {
            // If used as a component, emit the updated address
            this.addressUpdated.emit(updatedAddress);
          } else {
            // If used standalone, navigate back
            this.router.navigate(['/addresses']);
          }
        },
        error: (error) => {
          this.errorMessage = `Failed to update address: ${error.message}`;
          console.error('Error updating address:', error);
        }
      });
    } else {
      // Create new address
      this.addressService.createAddress(addressData).subscribe({
        next: (newAddress) => {
          if (this.address) {
            // If used as a component, emit the new address
            this.addressUpdated.emit(newAddress);
          } else {
            // If used standalone, navigate back
            this.router.navigate(['/addresses']);
          }
        },
        error: (error) => {
          this.errorMessage = `Failed to create address: ${error.message}`;
          console.error('Error creating address:', error);
        }
      });
    }
  }

  onCancel(): void {
    if (this.address) {
      // If used as a component, emit cancel event
      this.cancel.emit();
    } else {
      // If used standalone, navigate back
      this.router.navigate(['/addresses']);
    }
  }
}
