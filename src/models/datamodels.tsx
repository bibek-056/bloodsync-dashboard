export type InventoryData = {
  inventoryName: string;
  bloodGroupId: string;
  hospitalId: string;
  quantity: number;
};

export type EditInventoryData = {
  inventoryId: string;
  inventoryName: string;
  quantity: number;
  bloodGroupId: string;
  hospitalId: string;
};
export type PatientData = {
  patientName: string;
  dueDate: Date;
  inventoryId: string;
  priorityId: string;
  hospitalId: string;
};
export type EditPatientwaitlist = {
  patientId: string;
  patientName: string;
  dueDate: Date;
  priorityId: string;
  inventoryId: string;
  hospitalId: string;
};

export type DonorData = {
  name: string;
  email: string;
  address: string;
  userTypeId: string;
  hospitalId: string;
  userId: string;
  bloodGroupId: string;
  lastDonated: string;
  district: string;
  municipality: string;
  wardNo: number;
  phoneNumber: number;
  emergencyContact: number;
  registrationId: number;
};

export type EditDonors = {
  donorId: string;
  userId: string;
  bloodGroupId: string;
  userTypeId: string;
  hospitalId: string;
  address: string;
  name: string;
  email: string;
  lastDonated: string;
  district: string;
  municipality: string;
  wardNo: number;
  phoneNumber: number;
  emergencyContact: number;
  registrationId: number;
};

export type BloodGroup = {
  bloodGroupId: string;
  bloodGroupName: string;
};

export type Hospitals = {
  hospitalId: string;
  hospitalName: string;
};

export type UserType = {
  userTypeId: string;
  userTypeName: string;
};

export type UserTypes = {
  userTypeId: string;
  userTypeName: string;
  dateCreated: Date;
};

export type Hospital = {
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

export type EditAdminDataModel = {
  userId: string;
  name: string;
  hospitalId: string;
  address: string;
  email: string;
};

export type User = {
  userId: string;
  name: string;
  address: string;
  email: string;
  password: string;
  hospital: Hospital;
  userTypeId: string;
  // userType: UserTypes;
};

export type Donors = {
  index: number;
  name: string;
  hospitalAffiliated: string;
  donorId: string;
  lastDonated: string;
  district: string;
  municipality: string;
  wardNo: number;
  phoneNumber: number;
  emergencyContact: number;
  dateCreated: Date;
  hospital: Hospital;
  registrationId: number;
  user: User;
  bloodGroup: BloodGroup;
};

export type DonorTable = {
  index: number;
  donorName: string;
  bloodGroup: string;
  lastDonated: string;
  phoneNumber: number;
  district: string;
  municipality: string;
  wardNo: number;
  hospitalAffiliated: string;
  registrationId: number;
  emergencyContact: number;
  actions: JSX.Element;
};

export interface EditInventoryProps {
  editElement: PresentInventoryData;
  handleCloseEdit: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface EditHospitalProps {
  editElement: PresentHospitalData;
  handleCloseEdit: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface CreateInventoryProps {
  handleOpenForm: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export type SendEditData = {
  inventoryName: string;
  quantity: number;
  inventoryId: string;
  bloodGroupId: string;
  hospitalId: string;
};

export type PresentInventoryData = {
  inventoryName: string;
  quantity: number;
  inventoryId: string;
  bloodGroupId: string;
  dateModified: string;
  dateCreated: string;
  hospitalId: string;
};

export type PresentHospitalData = {
  userId: string;
  name: string;
  hospitalId: string;
  address: string;
  email: string;
};

export interface CreateAdminProps {
  handleOpenForm: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  hospitalId: string;
}
export interface EditPatientProps {
  editElement: PresentPatientData;
  handleCloseEdit: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface CreatePatientProps {
  handleOpenForm: (
    event?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export type SendEditPatientData = {
  patientId: string;
  dueDate: Date;
  patientName: string;
  inventoryId: string;
  priorityId: string;
  hospitalId: string;
};

export type PresentPatientData = {
  patientId: string;
  patientName: string;
  dueDate: Date;
  quantity: string;
  inventoryId: string;
  priorityId: string;
  dateCreated: string;
  hospitalId: string;
};
