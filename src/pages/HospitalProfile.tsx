import { useParams } from "react-router-dom";
import { useReadRequestQuery } from "../api/apiHandler";
import logo from "../assets/logo.png";
import { MdEditSquare } from "react-icons/md";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import { FiUsers } from "react-icons/fi";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { useState } from "react";
import { Hospital } from "../models/datamodels";
import EditHospital from "../components/Forms/EditHospital";

const HospitalProfile = () => {
  const { hospitalId } = useParams();

  const { data: hospitalProfile } = useReadRequestQuery(
    `hospitals/${hospitalId}`
  );

  const [editData, setEditData] = useState<Hospital | null>();

  const handleEdit = () => {
    setEditData(hospitalProfile);
  };

  const handleCloseEdit = () => {
    setEditData(null);
  };
  return (
    <div className="flex flex-col w-100vw border-2 rounded-md p-8 shadow-2xl gap-4">
      <div className="flex justify-between items-center border-0 border-b-2 p-3 shadow-sm border-[#006EB9]">
        <div className="flex justify-start gap-4 items-center">
          <div className="w-20 h-20 rounded-full border-2 shadow-lg flex justify-center items-center object-cover">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full rounded-full "
            />
          </div>
          <div>
            <p className="font-bold text-xl leading-7 tracking-wide text-[#006EB9]">
              {hospitalProfile?.hospitalName}
            </p>
          </div>
        </div>
        <div>
          <button
            className="flex items-center justify-center gap-2 border w-64 h-14 rounded p-4 bg-[#006EB9] text-white font-medium"
            onClick={handleEdit}
          >
            <MdEditSquare className="text-lg font-medium text-white hover:text-xl ease-in-out duration-100" />
            <p className="font-medium leading-6 text-lg">
              Edit Hospital Profile
            </p>
          </button>
        </div>
      </div>
      <div className="flex justify-between w-full ">
        <div className="w-1/2 p-4 h-full my-auto">
          <div className="w-9/10 h-full">
            {hospitalProfile?.hospitalDescription
              .split("\n")
              .map((paragraph:string, index :number) => (
                <p
                  key={index}
                  className="leading-6 text-base text-justify text-[rgba(44,39,36,0.75)]"
                >
                  {paragraph} <br/>
                </p>
              ))}
          </div>
        </div>
        <div className="w-1/2 p-4 h-full flex flex-col gap-6">
          <p className="text-xl font-semibold leading-6 p-4 border-b text-[#006EB9] border-[#006EB9]">
            General Information
          </p>
          <div className="flex flex-col gap-2 p-2 w-full text-[rgba(44,39,36,0.75)]">
            <div className="flex items-baseline gap-4">
              <span className="font-medium text-lg leading-4">
                Hospital Name:
              </span>
              <p>{hospitalProfile?.hospitalName}</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-medium text-lg leading-4">
                Hospital Address:
              </span>
              <p>{hospitalProfile?.hospitalAddress}</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="font-medium text-lg leading-4">Contact:</span>
              <p>{hospitalProfile?.contactInfo}</p>
            </div>
          </div>
          <div className="w-full h-full flex justify-around items-center gap-3">
            <div className="w-1/3 h-40 flex flex-col justify-center items-center border shadow-md rounded-lg gap-4 border-[#006EB9]">
              <div className="flex flex-col justify-center items-center w-1/3 h-1/3 border-2 rounded-full border-[#006EB9]">
                <FiUsers className="text-[#006EB9] text-lg" />
              </div>
              <p className="text-center text-[rgba(44,39,36,0.75)]">
                Total Available Donors: <br /> 123
              </p>
            </div>
            <div className="w-1/3 h-40 flex flex-col justify-center items-center border shadow-md rounded-lg gap-4 border-[#006EB9]">
              <div className="flex justify-center items-center w-1/3 h-1/3 border-2 rounded-full border-[#006EB9]">
                <BloodtypeIcon className="text-[#006EB9] text-lg" />
              </div>
              <p className="text-center text-[rgba(44,39,36,0.75)]">
                Available Inventory Units: <br /> 123
              </p>
            </div>
            <div className="w-1/3 h-40 flex flex-col justify-center items-center border shadow-md rounded-lg gap-4 border-[#006EB9]">
              <div className="flex justify-center items-center w-1/3 h-1/3 border-2 rounded-full border-[#006EB9]">
                <BsReverseListColumnsReverse className="text-[#006EB9] text-lg" />
              </div>
              <p className="text-center text-[rgba(44,39,36,0.75)]">
                Registered requests: <br /> 123
              </p>
            </div>
          </div>
        </div>
      </div>
      {editData && (
        <EditHospital
          editElement={editData}
          handleCloseEdit={handleCloseEdit}
        />
      )}
    </div>
  );
};

export default HospitalProfile;
