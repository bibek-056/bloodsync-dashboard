import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditAdminMutation,
  useReadRequestQuery,
} from "../../api/apiHandler";
import { CircularProgress } from "@mui/material";

type editData = {
  userId: string;
  name: string;
  hospitalId: string;
  address: string;
  email: string;
  password: string;
};

const EditHospital: React.FC<CreateHospitalProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    handleCloseEdit();
  };
  const form = useForm<editData>();
  const { register, handleSubmit } = form;

  const { data: hospitals } = useReadRequestQuery("hospitals");

  const [editAdmin] = useEditAdminMutation();

  const onSubmit = async (editData: editData) => {
    console.log(editData);
    setLoading(true);
    editData.userId = editElement.userId;
    try {
      await editAdmin(editData);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleClose();
  };
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <div className="w-2/5 h-screen bg-white flex justify-center items-center">
        <form
          className="w-4/5 h-4/5 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-10 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex items-center justify-between">
            <input
              className="text-lg font-medium leading-5 tracking-wide text-[#006EB9] border-b-2 border-[#006EB9] w-2/5 p-1"
              defaultValue={editElement.name}
              {...register("name")}
            ></input>
          </div>

          <div className="w-full flex items-center justify-between">
            <input
              className="text-lg font-medium leading-5 tracking-wide text-[#006EB9] border-b-2 border-[#006EB9] w-2/5 p-1"
              defaultValue={editElement.address}
              {...register("address")}
            ></input>
          </div>

          <div className="w-full flex items-center justify-between">
            <input
              className="text-lg font-medium leading-5 tracking-wide text-[#006EB9] border-b-2 border-[#006EB9] w-2/5 p-1"
              defaultValue={editElement.email}
              {...register("email")}
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
              Hospital Name
            </label>
            <select
              className="w-full rounded-md h-12 px-4 border"
              {...register("hospitalId")}
            >
              {hospitals?.map((oneGroup) => (
                <option
                  key={oneGroup.hopspitalId}
                  label={oneGroup.hospitalName}
                  defaultValue={editElement.hospitalId}
                  selected={oneGroup.hospitalId === editElement.hospitalId}
                >
                  {oneGroup.hospitalId}
                </option>
              ))}
            </select>
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
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHospital;
