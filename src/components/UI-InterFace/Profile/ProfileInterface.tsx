export interface Address {
  area: string;
  thana: string;
  district: string;
}

export interface EmergencyContact {
  name: string;
  relation: string;
  mobile: string;
  address: string;
}

export interface IProfile {
  name: string;
  idNo: string;
  photo: string;
  contact: string;
  email: string;
  profession: string;
  bloodGroup: string;
  address: Address;
  emergencyContact: EmergencyContact;
}
