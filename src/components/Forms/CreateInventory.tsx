import { AiOutlineCloseCircle } from "react-icons/ai";
import { AddButton, CancelButton, DeleteButton } from "../Buttons";

const CreateInventory = () => {
  return (
    <div className="flex justify-end fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <div className="w-2/5 h-screen bg-white flex justify-center items-center">
        <div className="w-4/5 h-4/5 margin-auto flex flex-col justify-around items-start rounded-md p-10 gap-10">
          <div className="w-full flex items-center justify-between">
            <p className="text-xl font-semibold leading-10 tracking-wide text-green-500">
              Create a new Inventory Item
            </p>
            <AiOutlineCloseCircle className="text-green-500 text-xl cursor-pointer" />
          </div>
          <div className=" w-full flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-green-500">
                Inventory Name
              </label>
              <input className="w-full rounded-md h-12 p-4 border"></input>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold leading-6 text-lg tracking-normal text-green-500">
                Blood Group
              </label>
              <input className="w-full rounded-md h-12 p-4 border"></input>
            </div>
          </div>
          <div className="w-full flex gap-4">
            <AddButton />
            <CancelButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInventory;
