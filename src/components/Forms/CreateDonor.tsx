import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { DonorData, BloodGroup } from '../../models/datamodels';
import { useState } from 'react';
import { useReadRequestQuery } from '../../api/apiHandler';

interface CreateDonorsProps {
  handleOpenForm: () => void;
}

export default function CreateDonor() {
  const form = useForm<DonorData>();
  const [showPassword, setShowPassword] = useState(false);
  const { register, control, handleSubmit } = form;
  const { data: bloodGroups } = useReadRequestQuery('bloodgroups');
  return (
    <>
      <main className="bg-white max-w-md p-2 rounded-md   mx-auto">
        <h1 className="text-3xl text-[#006EB9] text-center mt-6 font-bold">
          {' '}
          Create a Donor
        </h1>
        <form className="flex flex-col items-center">
          <p className=" w-3/4 text-[#006EB9] ml text-base mt-6 mb-1 font-semibold">
            Name
          </p>
          <input
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-4"
            {...register('name')}
          />
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Email
          </p>
          <input
            type="email"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-4"
            {...register('email')}
          />
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Password
          </p>
          <input
            type="password"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-4"
            {...register('password')}
          />
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Address
          </p>
          <input
            type="text"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-4"
            {...register('address')}
          />
          {/* District Municipality and Ward No */}
          <div className=" w-4/5 lg:w-full lg:ml-[90px] items-center flex lg:flex-row flex-col justify-center lg:gap-2 ">
            <div className="w-auto">
              <p className=" text-[#006EB9] text-base mb-1 font-semibold">
                District
              </p>
              <input
                type="text"
                className="w-[100%] px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-4"
                {...register('district')}
              />
            </div>
            <div className="">
              <p className="  text-[#006EB9] text-base mb-1 font-semibold">
                Municipality
              </p>
              <input
                type="text"
                className=" w-[100%] px-4 py-2 text-xl text-black border border-slate-800 rounded transition duration-200 ease-in-out focus:border-slate-100 mb-4"
                {...register('municipality')}
              />
            </div>
            <div className="m-0 p-0">
              <p className="  text-[#006EB9] text-base mb-1 font-semibold">
                Ward
              </p>
              <input
                type="text"
                className=" w-[40%] px-4 py-2 text-xl text-black border border-slate-800 rounded transition duration-200 ease-in-out focus:border-slate-100 mb-4"
                {...register('wardNo')}
              />
            </div>
          </div>
          {/* BloodGroup */}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Bloodgroup
          </p>
          <select
            placeholder="Select your blood group"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-4"
            {...register('bloodGroupId')}
          >
            <option disabled> Select a bloodgroup</option>
            {bloodGroups?.map((oneGroup: BloodGroup) => (
              <option label={oneGroup.bloodGroupName}>
                {oneGroup.bloodGroupId}
              </option>
            ))}
          </select>
        </form>
      </main>
    </>
  );
}
