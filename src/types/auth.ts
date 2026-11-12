export type Role = 'STUDENT' | 'OWNER' | 'ADMIN';
export type Gender = 'MALE' | 'FEMALE';

export interface StudentRegistrationData {
  // Step 1: Personal
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  dateOfBirth: string;
  homeAddress: string;
  contactNumber: string;

  // Step 2: Academic
  studentId: string;
  universityName: string;
  faculty: string;
  degreeProgram: string;
  academicYear: string;
  idPhoto?: File | null;

  // Step 3: Account
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface OwnerRegistrationData {
  // Step 1: Personal
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  nicNumber: string;
  dateOfBirth: string;
  homeAddress: string;

  // Step 2: Property
  propertyName: string;
  propertyType: 'HOUSE' | 'ROOM' | 'ANNEX' | 'APARTMENT' | 'HOSTEL';
  address: string;
  city: string;
  distanceFromUniversity: string;
  description: string;

  // Step 3: Documents
  nicDoc?: File | null;
  propertyDeedDoc?: File | null;
  electricityBillDoc?: File | null;
  propertyImages?: File[];
  propertyDocConsent?: boolean;

  // Step 4: Account
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface AdminRegistrationData {
  // Step 1: Personal
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  dateOfBirth: string;
  homeAddress: string;
  contactNumber: string;

  // Step 2: Account
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}
