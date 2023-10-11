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
  return (
    <button className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-green-500 text-white font-medium m-5">
      <IoMdAddCircleOutline className="text-lg"/> Add New Inventory
    </button>
  )
}
export const AddPatientButton = () => {
  return (
    <button className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-purple-500 text-white font-medium m-5">
      <IoPersonAdd className="text-lg" /> Add New Patient
    </button>
  );
};
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
