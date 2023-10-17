import React from "react";
import { useForm } from "react-hook-form";
import {
  useEditPatientMutation,
  useReadRequestQuery,
} from "../../api/apiHandler";

type EditData = {
  patientId: string;
  patientName: string;
  quantity: string;
  priorityId: string;
  inventoryId: string;
};

const EditPatientwaitlist: React.FC<CreatePatientProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const { handleSubmit, register } = useForm<EditData>();
  const [editPatient] = useEditPatientMutation();
  const { data: priorities } = useReadRequestQuery("Priority");
  const { data: inventoryItems } = useReadRequestQuery("inventorys");

  const onSubmit = async (editData: EditData) => {
    editData.patientId = editElement.patientId;
    try {
      await editPatient(editData);
    } catch (error) {
      console.log(error);
    }
    handleCloseEdit();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000007A] z-50">
      <form
        className="w-1/3 bg-white p-4 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-[#006EB9] mb-4">
          Edit Patientwaitlist
        </h2>
        <div className="mb-4">
          <label className="text-sm text-[#006EB9] block mb-2">Patient Name *</label>
          <input
            className="w-full border-b-2 border-[#006EB9] py-2"
            defaultValue={editElement.patientName}
            {...register("patientName", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-[#006EB9] block mb-2">Quantity *</label>
          <input
            className="w-full border-b-2 border-[#006EB9] py-2 text-black"
            type="text"
            defaultValue={editElement.quantity}
            {...register("quantity", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-[#006EB9] block mb-2">Priority</label>
          <select className="w-full border-b-2 border-[#006EB9] py-2" {...register("priorityId", { required: true })}>
            {priorities?.map((item) => (
              <option
                key={item.priorityId}
                label={item.priorityLevelName}
                defaultValue={editElement.priority.priorityId}
                selected={item.priorityId === editElement.priority.priorityId}
              >
                {item.priorityId}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-sm text-[#006EB9] block mb-2">Inventory Item</label>
          <select className="w-full border-b-2 border-[#006EB9] py-2" {...register("inventoryId", { required: true })}>
            {inventoryItems?.map((item) => (
              <option
                key={item.inventoryId}
                label={item.inventoryName}
                defaultValue={editElement.inventory.inventoryId}
                selected={item.inventoryId === editElement.inventory.inventoryId}
              >
                {item.inventoryId}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center">
          <button className="w-1/3 py-2 bg-[#006EB9] text-white rounded hover:bg-[#0056A9]" type="submit">
            Save Changes
          </button>
          <button className="w-1/3 py-2 bg-slate-500 text-white rounded hover-bg-slate-600" onClick={handleCloseEdit}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatientwaitlist;
