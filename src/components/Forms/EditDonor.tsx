import { useForm, SubmitHandler } from 'react-hook-form';
import {
  BloodGroup,
  UserTypes,
  Hospitals,
  EditDonors,
} from '../../models/datamodels';
import {
  useReadRequestQuery,
  useEditDonorMutation,
} from '../../api/apiHandler';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import Loading from '../Loading';

export default function EditDonor() {
  const form = useForm<EditDonors>();
  const { donorId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { data: bloodGroups } = useReadRequestQuery('bloodgroups');
  const { data: hospitals } = useReadRequestQuery('hospitals');
  const { data: userTypes } = useReadRequestQuery('userTypes');
  const {
    data: donorData,
    isLoading,
    error,
  } = useReadRequestQuery(`donors/${donorId}`);
  const [disableButton, setDisableButton] = useState(false);
  const navigate = useNavigate();
  const [editDonor] = useEditDonorMutation();
  const onSubmit: SubmitHandler<EditDonors> = async (data) => {
    data.userId = donorData.user.userId;
    data.donorId = donorData.donorId;
    data.password = 'fghjksjaj';
    console.log(data);
    setDisableButton(true);
    try {
      await editDonor(data).unwrap();
      console.log(data.hospitalId)
      toast.success('Sucessfully Edited Donor');
      navigate('/donor');
    } catch (error) {
      toast.error('Failed to Add a Donor');
    } finally {
      setDisableButton(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <p>Bad</p>;
  } else {
    return (
      <>
        <main className="bg-white max-w-md p-2 rounded-md   mx-auto">
          <h1 className="text-3xl text-[#006EB9] text-center mt-6 font-bold">
            Edit a donor
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
              {...register('name', {
                required: 'Name is required',
                maxLength: {
                  value: 32,
                  message: 'Max Length is 32',
                },
                minLength: {
                  value: 2,
                  message: 'Min length is 2',
                },
              })}
              defaultValue={donorData?.user.name}
            />
            {errors.name && (
              <p
                className=" m-0 w-full items-start ml-20 text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.name.message}
              </p>
            )}

            <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
              Email
            </p>
            <input
              type="email"
              className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
                  transition duration-200 ease-in-out
                 focus:border-slate-100 mb-2"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email address',
                },
              })}
              defaultValue={donorData?.user.email}
            />
            {errors.email && (
              <p
                className=" m-0 w-full items-start ml-20 text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.email.message}
              </p>
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
              {...register('address', {
                required: 'Address is required',
              })}
              defaultValue={donorData.user.address}
            />
            {errors.address && (
              <p
                className=" m-0 w-full items-start ml-20 text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.address.message}
              </p>
            )}
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
                 focus:border-slate-100 mb-2"
                  {...register('district', {
                    required: 'This field is required',
                  })}
                  defaultValue={donorData.district}
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
              <div className="">
                <p className="  text-[#006EB9] text-base mb-1 font-semibold">
                  Municipality
                </p>
                <input
                  type="text"
                  className=" w-[100%] px-4 py-2 text-xl text-black border border-slate-800 rounded transition duration-200 ease-in-out focus:border-slate-100 mb-2"
                  {...register('municipality', {
                    required: 'This field is required',
                  })}
                  defaultValue={donorData.municipality}
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
              <div className="m-0 p-0">
                <p className="  text-[#006EB9] text-base mb-1 font-semibold">
                  Ward
                </p>
                <input
                  type="text"
                  className=" w-[40%] px-4 py-2 text-xl text-black border border-slate-800 rounded transition duration-200 ease-in-out focus:border-slate-100 mb-2"
                  {...register('wardNo', {
                    required: 'This field is required',
                  })}
                  defaultValue={donorData.wardNo}
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
              {...register('bloodGroupId', {
                required: 'Blood Group ID is needed',
              })}
              defaultValue={donorData.bloodGroup.bloodGroupId}
            >
              <option disabled> Select a bloodgroup</option>
              {bloodGroups?.map((oneGroup: BloodGroup) => (
                <option label={oneGroup.bloodGroupName}>
                  {oneGroup.bloodGroupId}
                </option>
              ))}
            </select>
            {errors.bloodGroupId && (
              <p
                className=" m-0 w-4/5 items-start text-sm mb-1 text-red-600"
                role="alert"
              >
                *{errors.bloodGroupId.message}
              </p>
            )}
            <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
              Contact Number
            </p>
            <input
              type="text"
              className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
                  transition duration-200 ease-in-out
                 focus:border-slate-100 mb-2"
              {...register('phoneNumber', {
                required: 'Phone number is required',
                maxLength: {
                  value: 10,
                  message: 'Max Length is 10',
                },
                minLength: {
                  value: 9,
                  message: 'Minimum length is 9',
                },
              })}
              defaultValue={donorData.phoneNumber}
            />
            {errors.phoneNumber && (
              <p
                className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.phoneNumber.message}
              </p>
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
              {...register('emergencyContact', {
                required: 'Emergency Contact is required',
                maxLength: {
                  value: 10,
                  message: 'Max Length is 10',
                },
                minLength: {
                  value: 9,
                  message: 'Minimum length is 9',
                },
              })}
              defaultValue={donorData.emergencyContact}
            />
            {errors.emergencyContact && (
              <p
                className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.emergencyContact.message}
              </p>
            )}
            <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
              UserType
            </p>
            <select
              className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
                  transition duration-200 ease-in-out
                 focus:border-slate-100 mb-2"
              {...register('userTypeId')}
              defaultValue={donorData?.user.userTypeId}
            >
              <option label="Select the usertype"> Select the usertype</option>
              {userTypes?.map((oneGroup: UserTypes) => (
                <option label={oneGroup.userTypeName}>
                  {oneGroup.userTypeId}
                </option>
              ))}
            </select>
            {errors.userTypeId && (
              <p
                className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.userTypeId.message}
              </p>
            )}
            <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
              Hospital Affiliated
            </p>
            <select
              className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
                  transition duration-200 ease-in-out
                 focus:border-slate-100 mb-2"
              {...register('hospitalId', {
                required: 'Select a hospital',
              })}
              defaultValue={donorData?.hospital.hospitalId}
            >
              <option label="Select a hopsital"> </option>
              {hospitals?.map((oneGroup: Hospitals) => (
                <option label={oneGroup.hospitalName}>
                  {oneGroup.hospitalId}
                </option>
              ))}
            </select>
            {errors.userTypeId && (
              <p
                className=" m-0 w-full items-start text-sm text-red-600 mb-2"
                role="alert"
              >
                *{errors.userTypeId.message}
              </p>
            )}
            <p className="w-3/4  text-[#006EB9] text-base mb-1 font-semibold">
              Last Donated
            </p>
            <input
              className="w-4/5 px-4 py-2 text-xl text-black border border-slate-800 rounded
                  transition duration-200 ease-in-out
                 focus:border-slate-100 mb-2"
              type="date"
              value="2023-08-12"
              {...register('lastDonated')}
            />
            <button
              disabled={disableButton}
              type="submit"
              className="cursor-pointer  w-4/5 text-center  px-4 py-2 rounded text-white hover:bg-[#446eb6] bg-[#006EB9] text-base mb-1 font-thin
                  disabled:bg-blue-700 disabled:cursor-not-allowed"
            >
              Create Donor
            </button>
          </form>
        </main>
      </>
    );
  }
}
