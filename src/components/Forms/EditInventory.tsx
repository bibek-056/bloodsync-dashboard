import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditInventoryMutation,
  useReadRequestQuery,
} from "../../api/apiHandler";
import { CircularProgress } from "@mui/material";
import {
  BloodGroup,
  EditInventoryProps,
  SendEditData,
} from "../../models/datamodels";

const EditInventory: React.FC<EditInventoryProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  const handleClose = (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleCloseEdit(e);
  };

  const form = useForm<SendEditData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { data: bloodGroups } = useReadRequestQuery("bloodgroups");

  console.log(bloodGroups);

  const [editInventory] = useEditInventoryMutation();

  const onSubmit = async (editData: SendEditData) => {
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
            className="text-lg font-medium leading-5 tracking-wide text-[#006EB9] border-b-2 border-[#006EB9] w-2/5 p-1"
            defaultValue={editElement.inventoryName}
            {...register("inventoryName")}
          ></input>
          <select className="w-20 h-12" {...register("bloodGroupId")}>
            {bloodGroups?.map((oneGroup: BloodGroup) => (
              <option
                key={oneGroup.bloodGroupId}
                label={oneGroup.bloodGroupName}
                defaultValue={editElement.bloodGroupId}
                selected={oneGroup.bloodGroupId === editElement.bloodGroupId}
              >
                {oneGroup.bloodGroupId}
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
                className="w-full border rounded h-12 p-4 invalid:border-red-500 text-black"
                type="string"
                placeholder="Quantity"
                {...register("quantity", {
                  required: "Quantity is required",
                })}
              />
              {errors.quantity && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                  role="alert"
                >
                  *{errors.quantity.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className="flex items-center justify-center w-1/2 h-12 p-4 bg-[#006EB9] text-white rounded disabled:bg-slate-300"
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : <p>Save Changes</p>}
          </button>
          <button
            className="flex items-center justify-center w-1/2 h-12 p-4 bg-gray-500 text-white rounded disabled:bg-slate-300"
            disabled={loading}
            onClick={(e) => handleClose(e)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditInventory;
