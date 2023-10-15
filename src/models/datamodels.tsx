export type InventoryData = {
  inventoryName: string;
  bloodGroupId: number;
  quantity: number;
};

export type EditInventory = {
  inventoryId: string;
  inventoryName: string;
  quantity: number;
  bloodGroupId: string;
};
export type PatientData = {
  patientName: string;
  quantity: number;
  inventoryId: string;
  priorityId: string;
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
