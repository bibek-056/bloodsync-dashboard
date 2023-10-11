import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io"; 
import { IoPersonAdd } from 'react-icons/io5';
export const AddButton = () => {
  return (
    <button className="border w-full h-10 rounded p-2 bg-green-500 text-white font-medium">
      Add
    </button>
  );
};

export const BigButton = () => {
  const [createForm, setCreateForm] = useState<boolean>(false);
   
  function handleOpenForm(event: React.MouseEvent<HTMLButtonElement>) {
    setCreateForm(!createForm)
  }
  return (
    <button className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-green-500 text-white font-medium m-5" onClick={handleOpenForm}>
      <IoMdAddCircleOutline className="text-lg"/> Add New Inventory
    </button>
  )
}

interface AddPatientButtonProps {
  onClick: () => void;
}
const AddPatientButton: React.FC<AddPatientButtonProps> = ({ onClick }) => {
  return (
    <button
      className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-purple-500 text-white font-medium m-5"
      onClick={onClick}
    >
      <IoPersonAdd className="text-lg" /> Add New Patient
    </button>
  );
};
export default AddPatientButton;

export const DeleteButton = () => {
  return (
    <button className="border w-full h-10 rounded p-2 bg-red-500 text-white font-medium">
      Delete
    </button>
  );
};

export const EditButton = () => {
  return (
    <button className="border w-full h-10 rounded p-2 bg-blue-400 text-white font-medium">
      Edit
    </button>
  );
};

export const CancelButton = () => {
  return (
    <button className="border w-full h-10 rounded p-2 bg-gray-500 text-white font-medium">
      Cancel
    </button>
  );
};
