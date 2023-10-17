import { useForm, SubmitHandler } from 'react-hook-form';
import {
  DonorData,
  BloodGroup,
  UserTypes,
  Hospital,
} from '../../models/datamodels';
import { useAddDonorMutation, useReadRequestQuery } from '../../api/apiHandler';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import RequiredField from '../Alert/RequiredField';

// import Loading from '../Loading';

export default function CreateDonor() {
  const form = useForm<DonorData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { data: bloodGroups } = useReadRequestQuery('bloodgroups');
  const { data: hospitals } = useReadRequestQuery('hospitals');
  const { data: userTypes } = useReadRequestQuery('userTypes');
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const [addDonor] = useAddDonorMutation();
  const onSubmit: SubmitHandler<DonorData> = async (data) => {
    setDisableButton(true);
    try {
      await addDonor(data).unwrap();
      toast.success('Sucessfully Added Donor');
      navigate('/donor');
    } catch (error) {
      toast.error('Failed to Add a Donor');
    } finally {
      setDisableButton(false);
    }
  };
  const registerConditions = {
    name: {
      required: 'Name is required',
      maxLength: {
        value: 32,
        message: 'Max Length is 32',
      },
      minLength: {
        value: 2,
        message: 'Min length is 2',
      },
    },
    email: {
      required: 'Email is required',
      pattern: {
        value:
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        message: 'Invalid email address',
      },
    },
    password: {
      required: 'Password is required',
      maxLength: {
        value: 32,
        message: 'Max Length is 32',
      },
      minLength: {
        value: 2,
        message: 'Min length is 2',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
        message:
          'Invalid password, please have a uppercase, lowercase and a special character',
      },
    },
    address: {
      required: 'Address is required',
    },
    generic: {
      required: 'This field is required',
    },
    hospital: {
      required: 'Select a hospital',
    },
    phoneNumber: {
      required: 'Phone number is required',
      maxLength: {
        value: 10,
        message: 'Max Length is 10',
      },
      minLength: {
        value: 9,
        message: 'Minimum length is 9',
      },
    },
  };

  return (
    <>
      <main className="bg-white max-w-md p-2 rounded-md   mx-auto">
        <h1 className="text-3xl text-[#006EB9] text-center mt-6 font-bold">
          Create a Donor
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <p className=" w-3/4 text-[#006EB9] ml text-base mt-6 mb-1 font-semibold">
            Name
          </p>
          <input
            className={`w-4/5 px-4 py-2 text-xl text-black border ${
              errors.name ? 'border-red-500' : 'border-slate-800'
            } rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2`}
            {...register('name', registerConditions.name)}
          />
          {errors.name && <RequiredField message={errors.name.message} />}

          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Email
          </p>
          <input
            type="email"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            {...register('email', registerConditions.email)}
          />
          {errors.email && <RequiredField message={errors.email.message} />}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Password
          </p>
          <input
            type="password"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            {...register('password', registerConditions.password)}
          />
          {errors.password && (
            <RequiredField message={errors.password.message} />
          )}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Address
          </p>
          <input
            type="text"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2
           "
            {...register('address', registerConditions.generic)}
          />
          {errors.address && <RequiredField message={errors.address.message} />}
          {/* District Municipality and Ward No */}
          <div className=" w-4/5 grid grid-cols-2 gap-4 ">
            <div className="col-span-2 md:col-span-1">
              <p className="text-[#006EB9] text-base mb-1 font-semibold">
                Province
              </p>
              {/* <Autocomplete
                disablePortal
                options={provinces}
                id="combo-box-demo"
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Movie" />
                )}
              /> */}
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className=" text-[#006EB9] text-base mb-1 font-semibold">
                District
              </p>
              <input
                type="text"
                className="w-[100%] px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
                {...register('district', registerConditions.generic)}
              />
              {errors.district && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                  role="alert"
                >
                  *{errors.district.message}
                </p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="  text-[#006EB9] text-base mb-1 font-semibold">
                Municipality
              </p>
              <input
                type="text"
                className=" w-[100%] px-4 py-2 text-xl text-black border border-slate-800 rounded transition duration-200 ease-in-out focus:border-slate-100 mb-2"
                {...register('municipality', registerConditions.generic)}
              />
              {errors.municipality && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                  role="alert"
                >
                  *{errors.municipality.message}
                </p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="  text-[#006EB9] text-base mb-1 font-semibold">
                Ward
              </p>
              <input
                type="text"
                className=" w-[100%] px-4 py-2 text-xl text-black border border-slate-800 rounded transition duration-200 ease-in-out focus:border-slate-100 mb-2"
                {...register('wardNo', registerConditions.generic)}
              />
              {errors.wardNo && (
                <p
                  className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                  role="alert"
                >
                  *{errors.wardNo.message}
                </p>
              )}
            </div>
          </div>

          {/* BloodGroup */}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Bloodgroup
          </p>
          <select
            placeholder="Select your blood group"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 mb-2 ease-in-out
           focus:border-slate-100 "
            {...register('bloodGroupId', registerConditions.generic)}
          >
            <option disabled> Select a bloodgroup</option>
            {bloodGroups?.map((oneGroup: BloodGroup) => (
              <option label={oneGroup.bloodGroupName}>
                {oneGroup.bloodGroupId}
              </option>
            ))}
          </select>
          {errors.bloodGroupId && (
            <RequiredField message={errors.bloodGroupId.message} />
          )}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Contact Number
          </p>
          <input
            type="text"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            {...register('phoneNumber', registerConditions.phoneNumber)}
          />
          {errors.phoneNumber && (
            <RequiredField message={errors.phoneNumber.message} />
          )}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            {' '}
            Emergency Contact
          </p>
          <input
            type="text"
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            {...register('emergencyContact', registerConditions.phoneNumber)}
          />
          {errors.emergencyContact && (
            <RequiredField message={errors.emergencyContact.message} />
          )}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            UserType
          </p>
          <select
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            {...register('userTypeId', registerConditions.generic)}
          >
            <option label="Select a usertype" />
            {userTypes?.map((oneGroup: UserTypes) => (
              <option label={oneGroup.userTypeName}>
                {oneGroup.userTypeId}
              </option>
            ))}
          </select>
          {errors.userTypeId && (
            <RequiredField message={errors.userTypeId.message} />
          )}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Hospital Affiliated
          </p>
          <select
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            {...register('hospitalId', registerConditions.generic)}
          >
            <option label="Select a hospital" />
            {hospitals?.map((oneGroup: Hospital) => (
              <option label={oneGroup.hospitalName}>
                {oneGroup.hospitalId}
              </option>
            ))}
          </select>
          {errors.hospitalId && (
            <RequiredField message={errors.hospitalId?.message} />
          )}
          <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
            Last Donated
          </p>
          <input
            className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
            transition duration-200 ease-in-out
           focus:border-slate-100 mb-2"
            type="date"
            // defaultValue="2023-09-18"
            {...register('lastDonated', registerConditions.generic)}
          />
          {errors.lastDonated && (
            <RequiredField message={errors.lastDonated.message} />
          )}
          <button
            disabled={disableButton}
            type="submit"
            className="cursor-pointer  w-4/5 text-center  px-4 py-2 rounded text-white hover:bg-[#446eb6] bg-[#006EB9] text-base mb-1 font-thin
            disabled:bg-slate-200 disabled:cursor-not-allowed"
          >
            Create Donor
          </button>
        </form>
      </main>
    </>
  );
}
