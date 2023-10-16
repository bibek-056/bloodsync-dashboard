import { useForm } from "react-hook-form";
import { useEditInventoryMutation } from "../../api/apiHandler";
import { actions } from "react-table";

type editData = {
  inventoryName: string;
  quantity: number;
  action: boolean;
  inventoryId: string;
  bloodGroupId: string;
};

const EditInventory: React.FC<CreateInventoryProps> = ({
  editElement,
  handleCloseEdit,
}) => {
  const handleClose = () => {
    handleCloseEdit();
  };
  const form = useForm<editData>();
  const { register, handleSubmit } = form;

  const [editInventory] = useEditInventoryMutation();

  const newElement = { ...editElement };

  const onSubmit = async (editData: editData) => {
    console.log(editData);
    const newElement = {
      inventoryId : editElement.inventory,
      bloodGroupId : editElement.bloodGroupId,
      inventoryName : editData.inventoryName,
      quantity : 12
    }
    try {
      await editInventory(newElement);
    } catch(er) {
      console.log(er);
    }
  };
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
      <form
        className="w-1/3 h-2/3 bg-white flex flex-col justify-between items-center p-10 rounded-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full justify-between items-center">
          <input
            className="text-lg font-medium leading-5 tracking-wide text-[#006EB9] border-b-2 border-[#006EB9]"
            value={newElement.inventoryName}
            {...register("inventoryName")}
          ></input>
          <button
            className="flex items-center justify-center w-1/10 h-10 p-4 bg-slate-500 text-white rounded"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
        <div className="flex flex-col justify-between w-full h-3/5 border-2 border-[#006EB9] rounded p-4">
          <div className="w-full h-2/5 flex flex-col justify-evenly text-[#006EB9] gap-3 border-b-2 border-[#006EB9]">
            <div className="w-full flex justify-between items-center">
              <p className="font-medium text-lg leading-4">
                Available Quantity
              </p>
              <p>{newElement.quantity}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="font-medium text-lg leading-4">Last Updated On</p>
              {editElement.dateModified ? (
                <p>{editElement.dateModified.substring(0, 10)}</p>
              ) : (
                <p>{editElement.dateCreated.substring(0, 10)}</p>
              )}
            </div>
          </div>
          <div>
            <div>
              <input type="checkbox" {...register("action")} />
              <label> Add </label>
            </div>
            <div className="flex flex-col gap-2">
              <label>Amount to be Added:</label>
              <input
                className="w-[45%] border rounded h-12 p-4"
                type="number"
                {...register("quantity")}
              />
            </div>
          </div>
        </div>
        <button
          className="flex items-center justify-center w-1/2 h-12 p-4 bg-[#006EB9] text-white rounded"
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditInventory;
