
import { useState } from "react";

const AddAdmin = () => {

    const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000007A] z-50">
      <div className="w-96 bg-white p-6 rounded-lg">
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-lg text-black-500">First name</label>
              <input
                className="w-full rounded-md h-10 p-2 border"
                type="text"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="font-semibold text-lg text-black-500">Last name</label>
              <input
                className="w-full rounded-md h-10 p-2 border"
                type="text"
                placeholder="Enter last name"
              />
            </div>
          </div>
          <div>
            <label className="font-semibold text-lg text-black-500">Hospital name</label>
            <input
              className="w-full rounded-md h-10 p-2 border"
              type="text"
              placeholder="Enter hospital name"
            />
          </div>
          <div>
            <label className="font-semibold text-lg text-black-500">Address</label>
            <input
              className="w-full rounded-md h-10 p-2 border"
              type="text"
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="font-semibold text-lg text-black-500">Email</label>
            <input
              className="w-full rounded-md h-10 p-2 border"
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col relative">
            <label className="font-semibold text-lg text-black-500">Password</label>
            <input
              className="w-full rounded-md h-10 p-2 border"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <span
              className="absolute top-2/3 right-3 -translate-y-1/2 cursor-pointer text-sm text-blue-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
          <div className="d-flex justify-content-center mb-4">
            <label className="font-semibold text-lg text-black-500">
              Create admin?
            </label>
            <input
              className="ml-2"
              type="checkbox"
              id="form6Example8"
              defaultChecked
            />
          </div>
          <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
