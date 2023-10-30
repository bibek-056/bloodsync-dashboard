import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useReadRequestQuery, useAddAdminMutation } from "../../api/apiHandler";
import { AddAdminDataModel, CreateAdminProps, Hospitals, UserType} from "../../models/datamodels";
import { useState } from "react";
import { toast } from "react-toastify";



const AddAdmin: React.FC<CreateAdminProps> = (props) => {
  const [addAdmin] = useAddAdminMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<AddAdminDataModel>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: AddAdminDataModel) => {
    setLoading(true);
    try {
      await addAdmin(data);
      toast.success("Successfully Created New Admin");
    } catch (er) {
      toast.error("Failed to create Admin");
    }
    props.handleOpenForm();
  };

  const handelCloseForm = () => {
    props.handleOpenForm();
  };

  const { data: hospitals } = useReadRequestQuery("hospitals");
  const { data: userTypes } = useReadRequestQuery("userTypes");
  console.log(errors);

  return (
    <div className="flex justify-end fixed top-0 left-0 w-[100vw] top-[64px] h-[100vh] bg-[#0000007A] z-50 mx-auto">
      <div className="w-2/5 h-screen bg-white flex justify-center items-center  top-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 h-5/6 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-5  top-0 overflow-y-auto "
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-semibold leading-10 tracking-wide text-[#006EB9] gap-2">
              Create a new Admin
            </p>
            <AiOutlineCloseCircle
              className="text-[#006EB9] text-xl cursor-pointer"
              onClick={handelCloseForm}
            />
          </div>
          <div className=" w-full flex flex-col gap-0 top-0">
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Admin Name
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border border-slate-800"
                type="text"
                id="name"
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
                className="w-full rounded-md h-12 p-4 border border-slate-800"
                type="text"
                id="userAddress"
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
                className="w-full rounded-md h-12 p-4 border border-slate-800"
                type="text"
                id="AdminEmail"
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
                password
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border border-slate-800"
                type="text"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain at least 1 capital letter and 1 number",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Organization Name
              </label>
              <select
                className="w-full rounded-md h-12 px-4 border"
                
                {...register("hospitalId", {
                  required: "Hospital Name is required",
                 
                })}
              >
                <option>Select an organization name</option>
                {hospitals?.map((oneGroup: Hospitals) => (
                  <option 
                  label={oneGroup.hospitalName}
                  key= {oneGroup.hospitalId}
                  
                  >
                  </option>
                ))}
              </select>
              {errors.hospitalId && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                >
                  *{errors.hospitalId.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                User Type
              </label>
              <select
                className="w-full rounded-md h-12 px-4 border"
                id="userType"
                {...register("userTypeId", {
                  required: "User Type is required",
                  pattern: {
                    value: /[A-Za-z]/,
                    message: "This is required field",
                  },
                })}
              >
                <option>Select UserType</option>
                {userTypes?.map((oneGroup: UserType) => (
                  <option label={oneGroup.userTypeName}>
                    {oneGroup.userTypeId}
                  </option>
                ))}
              </select>
              {errors.userTypeId && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                >
                  *{errors.userTypeId.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex gap-4">
            <button
              className="border w-full h-10 rounded p-2 bg-[#006EB9] text-white font-medium disabled:bg-gray-500"
              disabled={loading}
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
      </div>
    </div>
  );
};

export default AddAdmin;
