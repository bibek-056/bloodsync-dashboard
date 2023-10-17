import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { DevTool } from '@hookform/devtools';
import { useAddHospitalMutation } from '../../api/apiHandler';
import { Hospital } from '../../models/datamodels';
import { toast } from 'react-toastify';

interface CreateHospitalProps {
  handleOpenForm: () => void;
}

const CreateHospital: React.FC<CreateHospitalProps> = (props) => {
  const [addHospital] = useAddHospitalMutation();
  const [loading, setLoading] = useState<Boolean>(false);

  const form = useForm<Hospital>();
  const { register, control, handleSubmit } = form;

  const onSubmit = async (data: Hospital) => {
    setLoading(true);
    try {
      await addHospital(data);
      toast.success('Successfully Added new patient');
    } catch (er) {
      toast.error('Failed to Add new Patient');
    }
    props.handleOpenForm();
  };

  const handleCloseForm = () => {
    props.handleOpenForm();
  };

  return (
    <div className="flex justify-end fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <div className="w-2/5 h-screen bg-white flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 h-4/5 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-10"
        >
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-semibold leading-10 tracking-wide text-[#006EB9]">
              Add a new Hospital
            </p>
            <AiOutlineCloseCircle
              className="text-[#006EB9] text-xl cursor-pointer"
              onClick={handleCloseForm}
            />
          </div>
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Name
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="hospitalName"
                {...register('hospitalName')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Address
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="hospitalName"
                {...register('hospitalAddress')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Logo Url
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="logoUrl"
                {...register('logoUrl')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Hospital Description
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="hospitalDescription"
                {...register('hospitalDescription')}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-[#006EB9]">
                Contact Info
              </label>
              <input
                className="w-full rounded-md h-12 p-4 border"
                type="text"
                id="contactInfo"
                {...register('contactInfo')}
              />
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

export default CreateHospital;
