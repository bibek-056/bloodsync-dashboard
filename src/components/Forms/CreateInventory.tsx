import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  useReadRequestQuery,
  useAddInventoryMutation,
} from "../../api/apiHandler";
import { InventoryData } from "../../models/datamodels";
import { toast } from "react-toastify";

interface CreateInventoryProps {
  handleOpenForm: () => void;
}

const CreateInventory: React.FC<CreateInventoryProps> = (props) => {
  const [addInventory] = useAddInventoryMutation();
  const [loading, setLoading] = useState<Boolean>(false);

  const form = useForm<InventoryData>();
  const { register, control, handleSubmit } = form;

  const onSubmit = async (data: InventoryData) => {
    setLoading(true)
    try{
      await addInventory(data);
      toast.success("Successfully Created Inventory Item")
    } catch(er) {
      toast.error("Failed to create Inventory")
    }
    props.handleOpenForm();
  };

  const handelCloseForm = () => {
    props.handleOpenForm();
  };

  const { data: bloodGroups } = useReadRequestQuery("bloodgroups");

  console.log(bloodGroups);
  return (
    <div className="flex justify-end fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <div className="w-2/5 h-screen bg-white flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 h-4/5 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-10"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-semibold leading-10 tracking-wide text-[#006EB9]">
              Create a new Inventory Item
            </p>
            <AiOutlineCloseCircle
              className="text-[#006EB9] text-xl cursor-pointer"
              onClick={handelCloseForm}
            />
          </div>
          <div className=" w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Inventory Name
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="inventoryName"
                {...register("inventoryName")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Blood Group
              </label>
              <select
                className="w-full rounded-md h-12 px-4 border"
                id="bloodGroup"
                {...register("bloodGroupId")}
              >
                <option>Select a blood group</option>
                {bloodGroups?.map((oneGroup) => (
                  <option label={oneGroup.bloodGroupName}>
                    {oneGroup.bloodGroupId}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Quantity
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="bloodGroup"
                {...register("quantity")}
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <button
              className="border w-full h-10 rounded p-2 bg-[#006EB9] text-white font-medium disabled:bg-gray-500"
              disabled={ loading }
              type="submit"
            >
              Add
            </button>
            <button
              className="border w-full h-10 rounded p-2 bg-gray-500 text-white font-medium"
              onClick={handelCloseForm}
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

export default CreateInventory;
