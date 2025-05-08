export interface AcademicInstitution {
  id: number;
  name: string;
  university: string;
  phone: number;
  fax?: number;
  address_id: number;
  address: {
    id: number;
    address_details: string;
    zip_code: number;
    city?: string;
    state: string;
    additional_details?: string;
  };
  email: string;
  director: string;
  logo_url?: string;
}
