import { EditHospitalProfileProps, Hospital } from "../../models/datamodels";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEditHospitalMutation } from "../../api/apiHandler";

const EditHospital: React.FC<EditHospitalProfileProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const form = useForm<Hospital>();

  const [editHospital] = useEditHospitalMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (editData: Hospital) => {
    setLoading(true);
    editData.hospitalId = editElement.hospitalId;
    try {
      await editHospital(editData);
    } catch (er) {
      console.log(er);
    }
    setLoading(false);
    handleCancel();
  };

  const handleCancel = () => {
    handleCloseEdit();
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000007A] z-50">
      <form
        className="w-3/5 bg-white flex flex-col justify-between items-center p-10 rounded-md gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full pb-2 border-b-2 border-[#006EB9] text-[#006EB9]">
          <p className="w-full text-xl font-semibold leading-6 tracking-wide">
            {" "}
            Edit Hospital Profile
          </p>
        </div>
        <div className=" w-full flex flex-col items-center gap-5">
          <div className="w-full flex gap-2">
            <div className="w-1/2 flex flex-col gap-2">
              <label className=" w-full font-medium text-lg leading-5 text-[#006EB9]">
                Hospital Name
              </label>
              <input
                className="w-full h-12 border rounded-md p-2"
                type="text"
                defaultValue={editElement.hospitalName}
                {...register("hospitalName", {
                  required: "Hospital Name is required",
                  maxLength: {
                    value: 55,
                    message:
                      "Hospital Name cannot be longer than 55 characters",
                  },
                })}
              />
              {errors.hospitalName && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                  role="alert"
                >
                  *{errors.hospitalName.message}
                </p>
              )}
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label className=" w-full font-medium text-lg leading-5 text-[#006EB9]">
                Contact No
              </label>
              <input
                className="w-full h-12 border rounded-md p-2"
                type="text"
                defaultValue={editElement.contactInfo}
                {...register("contactInfo", {
                  required: "Contact info is required",
                  maxLength: {
                    value: 10,
                    message: "cannot be longet than 15 characters",
                  },
                })}
              />
              {errors.contactInfo && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                  role="alert"
                >
                  *{errors.contactInfo.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <label className="font-medium text-lg leading-5 text-[#006EB9]">
              Hospital Description
            </label>
            <textarea
              className="w-full h-32 border rounded-md p-2"
              defaultValue={editElement?.hospitalDescription}
              {...register("hospitalDescription", {
                required: "Hospital Description is Required",
                minLength: {
                  value: 200,
                  message: "Description needs to be atleast 200 characters",
                },
                maxLength: {
                  value: 1000,
                  message: "Description cannot be longer than 1000 characters",
                },
              })}
            />
            {errors.hospitalDescription && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                  role="alert"
                >
                  *{errors.hospitalDescription.message}
                </p>
              )}
          </div>
          <div className="w-full flex gap-2">
            <div className="w-1/2 flex flex-col gap-2">
              <label className=" w-full font-medium text-lg leading-5 text-[#006EB9]">
                Address
              </label>
              <input
                className="w-full h-12 border rounded-md p-2"
                type="text"
                defaultValue={editElement.hospitalAddress}
                {...register("hospitalAddress", {
                  required: "Address is required",
                  maxLength: {
                    value: 55,
                    message: "Address cannot be longer than 55 characters",
                  },
                })}
              />
              {errors.hospitalAddress && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                  role="alert"
                >
                  *{errors.hospitalAddress.message}
                </p>
              )}
            </div>
            <div className="w-1/2 flex flex-col gap-2">
              <label className=" w-full font-medium text-lg leading-5 text-[#006EB9]">
                Logo Url
              </label>
              <input
                className="w-full h-12 border rounded-md p-2"
                type="text"
                defaultValue={editElement.logoUrl}
                {...register("logoUrl", {
                  required: "Logo is required",
                  maxLength: {
                    value: 100,
                    message: "Url cannot be longer than 100 charaters",
                  },
                })}
              />
              {errors.logoUrl && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600"
                  role="alert"
                >
                  *{errors.logoUrl.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <button
            className="flex items-center justify-center w-1/2 h-12 p-4 bg-[#006EB9] text-white rounded disabled:bg-slate-300"
            type="submit"
          >
            {loading ? <CircularProgress /> : <p>Save Changes</p>}
          </button>
          <button
            className="flex items-center justify-center w-1/2 h-12 p-4 bg-gray-500 text-white rounded disabled:bg-slate-300"
            disabled={loading}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHospital;
