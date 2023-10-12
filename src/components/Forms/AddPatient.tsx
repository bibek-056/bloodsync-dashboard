import { AddButton, CancelButton } from "../Buttons";
import { IoPersonAdd } from 'react-icons/io5';

const AddForm = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[#0000007A] z-50">
      <div className="w-96 bg-white p-6 rounded-lg">
        <div className="text-center">
          <p className="text-xl font-semibold text-black-500 mb-4">Add a New Patient</p>
          <IoPersonAdd className="text-xl text-black-500 cursor-pointer" />
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-black-500">Patient Name</label>
            <input
              className="w-full rounded-md h-10 p-2 border"
              type="text"
              placeholder="Enter patient name"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-black-500">Quantity</label>
            <input
              className="w-full rounded-md h-10 p-2 border"
              type="number"
              placeholder="Enter quantity"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-black-500">Inventory Item</label>
            <select className="w-full rounded-md h-10 p-2 border">
              <option value="item1">Item 1</option>
              <option value="item2">Item 2</option>
              <option value="item3">Item 3</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-black-500">Priority</label>
            <select className="w-full rounded-md h-10 p-2 border">
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <AddButton />
            <CancelButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
