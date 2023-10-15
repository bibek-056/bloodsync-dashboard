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