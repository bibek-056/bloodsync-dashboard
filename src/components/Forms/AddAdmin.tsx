import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useReadRequestQuery, useAddAdminMutation } from "../../api/apiHandler";
import { AddAdminDataModel } from "../../models/datamodels";
import { useState } from "react";
import { toast } from "react-toastify";

interface CreateAdminProps {
  handleOpenForm : () => void;
}

const CreateInventory: React.FC<CreateAdminProps> = (props) => {

  const [ addAdmin ] = useAddAdminMutation();
  const [loading, setLoading] = useState<Boolean>(false);

  const form = useForm<AddAdminDataModel>();
  const { register, control, handleSubmit } = form;

  const onSubmit = async (data: AddAdminDataModel) => {
    setLoading(true)
    try{
      await addAdmin(data);
      toast.success("Successfully Created Inventory Item")
    } catch(er) {
      toast.error("Failed to create Inventory")
    }
    props.handleOpenForm();
  };

  const handelCloseForm = () => {
    props.handleOpenForm();
  }

  const { data: hospitals } = useReadRequestQuery("hospitals")
  const { data: userTypes } = useReadRequestQuery("userTypes")

  
  return (
    <div className="flex justify-end fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <div className="w-2/5 h-screen bg-white flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 h-4/5 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-10 overflow-y-auto"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-semibold leading-10 tracking-wide text-[#006EB9]">
              Create a new Admin
            </p>
            <AiOutlineCloseCircle className="text-[#006EB9] text-xl cursor-pointer" onClick={handelCloseForm} />
          </div>
          <div className=" w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Admin Name
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="name"
                {...register("name")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                User address
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="userAddress"
                {...register("address")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Admin Email
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="AdminEmail"
                {...register("email")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                password
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="password"
                {...register("password")}
              />
            </div>



            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Organization Name
              </label>
              <select
                className="w-full rounded-md h-12 px-4 border"
                id="hospitalId"
                {...register("hospitalId")}
              >
                <option>Select an organization name</option>
                {hospitals?.map((oneGroup) => (
                  <option label={oneGroup.hospitalName}>{oneGroup.hospitalId}</option>
                ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                User Type
              </label>
              <select
                className="w-full rounded-md h-12 px-4 border"
                id="userType"
                {...register("userTypeId")}
              >
                <option>Select UserType</option>
                {userTypes?.map((oneGroup) => (
                  <option label={oneGroup.userTypeName}>{oneGroup.userTypeId}</option>
                ))}
                </select>
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

            <button className="border w-full h-10 rounded p-2 bg-gray-500 text-white font-medium" onClick={handelCloseForm}>
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
