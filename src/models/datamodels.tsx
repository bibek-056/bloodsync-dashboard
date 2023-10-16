export type InventoryData = {
  inventoryName: string;
  bloodGroupId: number;
  quantity: number;
};

export type EditInventoryData = {
    inventoryId: string;
    inventoryName: string;
    quantity: string;
    bloodGroupId: string;
};
export type PatientData = {
  patientName: string;
  quantity: number;
  inventoryId: string;
  priorityId: string;
};
export type EditPatientwaitlist= {
  patientId: string;
  patientName: string;
  quantity: number;
  priorityId: string;
  inventoryId: string;
  
};

export type DonorData = {
  name: string;
  email: string;
  password: string;
  address: string;
  userTypeId: string;
  hospitalId: string;
  userId: string;
  bloodGroupId: string;
  lastDonated: string;
  district: string;
  municipality: string;
  wardNo: number;
  phoneNumber: string;
  emergencyContact: string;
};

export type EditDonor = {
  donorId: string;
  userId: string;
  bloodGroupId: string;
  usertypeId: string;
  name: string;
  email: string;
  lastDonated: string;
  district: string;
  municipality: string;
  wardNo: number;
  phoneNumber: string;
  emergencyContact: string;
};

export type BloodGroup = {
  bloodGroupId: string;
  bloodGroupName: string;
};

export type UserTypes = {
  userTypeId: string;
  userTypeName: string;
  dateCreated: Date;
};

export type HospitalDataModel = {
  hospitalId: string;
  hospitalName: string;
  hospitalAddress: string;
  logoUrl: string;
  hospitalDescription: string;
  contactInfo: string;
  dateCreated: Date;
  dateModified: Date;
};
export type AddAdminDataModel = {
    userId: string;
    hospitalId: string;
    userTypeId: string;
    name: string;
    hospitalName: string;
    address: string;
    email: string;
    password: string;
};
