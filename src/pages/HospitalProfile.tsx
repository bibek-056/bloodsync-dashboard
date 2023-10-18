import { useParams } from "react-router-dom";
import { useReadRequestQuery } from "../api/apiHandler";
import logo from "../assets/logo.png";

const HospitalProfile = () => {
  const { hospitalId } = useParams();

  const { data: hospitalProfile } = useReadRequestQuery(
    `hospitals/${hospitalId}`
  );

  console.log(hospitalProfile);
  return (
    <div className="flex flex-col w-100vw h-full border-2 rounded-md p-8 shadow-2xl gap-4">
      <div className="flex justify-between items-center border-0 border-b-2 p-3 shadow-sm">
        <div className="flex justify-start gap-4 items-center">
          <div className="w-20 h-20 rounded-full border-2 shadow-lg flex justify-center items-center object-cover">
            <img src={logo} alt="logo" className="w-full h-full rounded-full "/>
          </div>
          <div>
            <p className="font-medium text-lg">
              {hospitalProfile?.hospitalName}
            </p>
          </div>
        </div>
        <div>
          <button className=" h-12 flex justify-center items-center bg-[#006EB9] text-white font-medium leading-5 text-lg p-4 rounded-md">
            {" "}
            Edit Hospital Profile{" "}
          </button>
        </div>
      </div>
      <div className="flex justify-between w-full ">
        <div className="w-1/2 p-4 h-full">
          {/* <p>{hospitalProfile.hospitalDescription}</p> */}
          <p className="w-9/10 h-full leading-6 text-base text-justify">
            CHR is situated in one of the most remote and rural regions of
            Nepal. It is located in the centre of three districts (Rukum,
            Jajarkot, Salyan) in the mid-western region of Nepal. The aim of the
            hospital is to mainly provide quality and affordable medical
            services to the underprivileged and marginalized communities of
            people of Rukum and its surrounding districts.
          </p>
        </div>
        <div className="w-1/2 p-4 h-full">
           <p className="text-xl font-semibold leading-6 p-4">General Information</p>
           <div className="p-2 w-full">
            <p>Hospital Name: {hospitalProfile?.hospitalName}</p>
            <p>Hospital Address: {hospitalProfile?.hospitalAddress}</p>
            <p>Contact: {hospitalProfile?.contactInfo}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalProfile;
