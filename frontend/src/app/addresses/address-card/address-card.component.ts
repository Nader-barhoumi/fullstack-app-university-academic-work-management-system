import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
})
export class AddressCardComponent {
  @Input() institutionId!: number;
  @Input() address: any;
}