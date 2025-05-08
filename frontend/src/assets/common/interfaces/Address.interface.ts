import { States } from '../enums/States.enums';

export interface Address {
  id?: number;
  address_details: string;
  zip_code?: number;
  city?: string;
  state?: States | string;
  additional_details?: string;
}
