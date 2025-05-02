import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddressService } from '../address.service';
import { Address } from '../../../assets/common/interfaces/Address.interface';

@Component({
  selector: 'app-address-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AddressesListComponent implements OnInit {
  addresses: Address[] = [];
  errorMessage: string | null = null;

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = error.message;
        console.error('Error loading addresses:', error);
      }
    });
  }

  editAddress(id: number): void {
    this.router.navigate(['/addresses/edit', id]);
  }

  deleteAddress(id: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(id).subscribe({
        next: () => {
          this.loadAddresses();
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error deleting address:', error);
        }
      });
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/addresses/create']);
  }
}
