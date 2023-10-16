import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditInventoryMutation,
  useReadRequestQuery,
} from "../../api/apiHandler";

type editData = {
  inventoryName: string;
  quantity: string;
  inventoryId: string;
  bloodGroupId: string;
};

const EditInventory: React.FC<CreateInventoryProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  const handleClose = () => {
    handleCloseEdit();
  };
  const form = useForm<editData>();
  const { register, handleSubmit } = form;

  const { data: bloodGroups } = useReadRequestQuery("bloodgroups");

  const [editInventory] = useEditInventoryMutation();

  const onSubmit = async (editData: editData) => {
    setLoading(true);
    editData.inventoryId = editElement.inventoryId;
    {
      add
        ? (editData.quantity = (
            Number(editData.quantity) + Number(editElement.quantity)
          ).toString())
        : (editData.quantity = (
            Number(editElement.quantity) - Number(editData.quantity)
          ).toString());
    }
    try {
      await editInventory(editData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleClose();
  };
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <form
        className="w-1/3 h-3/4 bg-white flex flex-col justify-between items-center p-10 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full justify-between items-center">
          <input
            className="text-lg font-medium leading-5 tracking-wide text-[#006EB9] border-b-2 border-[#006EB9]"
            defaultValue={editElement.inventoryName}
            {...register("inventoryName")}
          ></input>
          <select className="w-20 h-12" {...register("bloodGroupId")}>
            {bloodGroups?.map((oneGroup) => (
              <option
                key={oneGroup.bloodGroupId}
                value={oneGroup.bloodGroupId}
                selected={oneGroup.bloodGroupId === editElement.bloodGroupId}
              >
                {oneGroup.bloodGroupName}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-between w-full h-3/5 border-2 border-[#006EB9] rounded p-4">
          <div className="w-full h-2/5 flex flex-col justify-evenly text-[#006EB9] gap-3 border-b-2 border-[#006EB9]">
            <div className="w-full flex justify-between items-center">
              <p className="font-medium text-lg leading-4">
                Available Quantity
              </p>
              <p>{editElement.quantity}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-medium text-lg leading-4">Last Updated On</p>
              {editElement.dateModified ? (
                <p>{editElement.dateModified.substring(0, 10)}</p>
              ) : (
                <p>{editElement.dateCreated.substring(0, 10)}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 my-4 text-white">
            <div className="flex w-full justify-stretch gap-0">
              <button
                className="w-full border flex justify-center items-center p-2 h-10 bg-slate-300 rounded disabled:bg-red-500"
                disabled={!add}
                onClick={() => setAdd(!add)}
              >
                Use Inventory
              </button>
              <button
                className="w-full border flex justify-center items-center p-2 h-10 bg-slate-300 rounded disabled:bg-[#006EB9]"
                disabled={add}
                onClick={() => setAdd(!add)}
              >
                Add Inventory
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="w-full border rounded h-12 p-4"
                type="string"
                placeholder="Quantity"
                {...register("quantity")}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className="flex items-center justify-center w-1/2 h-12 p-4 bg-[#006EB9] text-white rounded disabled:bg-slate-500"
            type="submit"
            disabled={loading}
          >
            Save Changes
          </button>
          <button
            className="flex items-center justify-center w-1/2 h-12 p-4 bg-gray-500 text-white rounded disabled:bg-slate-500"
            disabled={loading}
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInventory;
