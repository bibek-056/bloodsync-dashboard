import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditAdminMutation,
  useReadRequestQuery,
} from "../../api/apiHandler";
import { CircularProgress } from "@mui/material";
import { EditHospitalProps, Hospitals } from "../../models/datamodels";

type editData = {
  userId: string;
  name: string;
  hospitalId: string;
  address: string;
  email: string;
  password: string;
};

const EditHospital: React.FC<EditHospitalProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClose = () => {
    handleCloseEdit();
  };
  const form = useForm<editData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

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
      <div className="w-1/3 h-3/4 bg-white flex flex-col justify-between items-center p-10 top-0 rounded-md">
        <form
          className="w-9/10 h-9/10 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-2 top-0 overflow-y-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col  gap-0 top-0 ">
            <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
              Admin Name
            </label>
            <input
              className="w-full rounded-md h-12 p-4 border"
              type="text"
              id="name"
              defaultValue={editElement.name}
              {...register("name", {
                required: "Full Name is required",
                pattern: {
                  value: /[A-Za-z]{4}/,
                  message:
                    "Full Name should contain at least 4 alphabetic characters.",
                },
                validate: (value) => {
                  if (!value.includes(" ")) {
                    return "Please enter both first name and last name";
                  }
                  if (/\d/.test(value)) {
                    return "First name should not contain numbers.";
                  }
                  return true;
                },
              })}
            />

            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
              User address
            </label>
            <input
              className="w-full rounded-md h-12 p-4 border"
              type="text"
              id="userAddress"
              defaultValue={editElement.address}
              {...register("address", {
                required: "Full Address is required",
                pattern: {
                  value: /[A-Za-z]{4}/,
                  message:
                    "Full Address should contain at least 4 alphabetic characters.",
                },
              })}
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
              Admin Email
            </label>
            <input
              className="w-full rounded-md h-12 p-4 border"
              defaultValue={editElement.email}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message:
                    "Email should contain be in item@gmail.com, item@hotmail.com format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
              Organization Name
            </label>
            <select
              className="w-full rounded-md h-12 px-4 border"
              {...register("hospitalId", {
                required: "Organization Name is required",
              })}
            >
              <option label="Select Organization"></option>
              {hospitals?.map((oneGroup: Hospitals) => (
                <option
                  key={oneGroup.hospitalId}
                  label={oneGroup.hospitalName}
                  defaultValue={editElement.hospitalId}
                  selected={oneGroup.hospitalId === editElement.hospitalId}
                >
                  {oneGroup.hospitalId}
                </option>
              ))}
            </select>
            {errors.hospitalId && (
              <p className=" m-0 w-full items-start text-sm text-red-600">
                *{errors.hospitalId.message}
              </p>
            )}
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
