import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class AddressCardComponent {
  @Input() institutionId!: number;
  @Input() address: any;
}
