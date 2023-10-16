import { useForm } from "react-hook-form";
import { useState } from "react";
import { IoPersonAdd } from 'react-icons/io5';
import { DevTool } from "@hookform/devtools";
import { AddButton } from "../Buttons";
import { useReadRequestQuery, useAddPatientMutation } from "../../api/apiHandler";
import { PatientData } from "../../models/datamodels";
import { toast } from "react-toastify";

interface CreatePatientProps {
  handleOpenForm: () => void;
}

const CreatePatient: React.FC<CreatePatientProps> = (props) => {
  const [addPatient] = useAddPatientMutation();
  const [loading, setLoading] = useState<Boolean>(false);

  const form = useForm<PatientData>();
  const { register, control, handleSubmit } = form;

   const onSubmit = async (data: PatientData) => {
    setLoading(true)
    try{
      await addPatient(data);
      toast.success("Successfully Added new patient")
    } catch(er) {
      toast.error("Failed to Add new Patient")
    }
    props.handleOpenForm();
  };


  const handleCloseForm = () => {
    props.handleOpenForm();
  }

  const { data: priorities } = useReadRequestQuery("Priority");
  const { data: inventoryItems } = useReadRequestQuery("inventorys");

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000007A] z-50">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 p-4"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-semibold text-[#006EB9]">
              Add a new Patient
            </p>
            <IoPersonAdd className="text-[#006EB9] text-xl cursor-pointer" onClick={handleCloseForm} />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg text-[#006EB9]">
                Patient Name
              </label>
              <input
                className="w-full rounded-md h-12 p-3 border"
                type="text"
                id="patientName"
                {...register("patientName")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg text-[#006EB9]">
                Quantity
              </label>
              <input
                className="w-full rounded-md h-12 p-3 border"
                type="text"
                id="quantity"
                {...register("quantity")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-lg text-[#006EB9]">
                Priority
              </label>
              <select
                className="w-full rounded-md h-12 p-3 border"
                id="priority"
                {...register("priorityId")}
              >
                <option>Select a priority</option>
                {priorities?.map((priority) => (
                  <option value={priority.priorityId} key={priority.priorityId}>
                    {priority.priorityLevelName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg text-[#006EB9]">
                Inventory Item
              </label>
              <select
                className="w-full rounded-md h-12 p-3 border"
                id="inventoryItem"
                {...register("inventoryId")}
              >
                <option>Select an inventory item</option>
                {inventoryItems?.map((item) => (
                  <option value={item.inventoryId} key={item.inventoryId}>
                    {item.inventoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full flex justify-end gap-4">
            <AddButton />
            <button
              className="border w-32 h-12 rounded p-2 bg-gray-500 text-white font-medium"
              onClick={handleCloseForm}
            >
              Cancel
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default CreatePatient;
