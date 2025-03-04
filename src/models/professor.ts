import type { Companies } from './companies';

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

export interface Professor {
  id: number;
  fullname: string;
  age: number;
  gender: Gender;
  address: string;
  telephone: string;
  email: string;
  companies: Companies[];
}
