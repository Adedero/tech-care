export interface Patient {
  id: number;
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: string | Date;
  phone_number: string;
  emergency_contact: string;
  insurance_type: string;
  diagnosis_history : DiagnosisHistory[];
  diagnostic_list: { name: string; description: string; status: string }[];
  lab_results: string[]
}

export interface DiagnosisHistory {
  month: string;
  year: number;
  blood_pressure : {
    systolic: { value: number; levels : string };
    diastolic: { value: number; levels: string };
  },
  heart_rate: { value: number; levels: string };
  respiratory_rate: { value: number; levels: string };
  temperature: { value: number; levels: string };
}