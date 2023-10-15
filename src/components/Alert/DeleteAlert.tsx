import { useDeleteRequestMutation } from "../../api/apiHandler";
import { toast } from "react-toastify";
import { useState } from "react";

const DeleteAlert = ({ deleteRecord, handleCancel }) => {
  const [deleteInventory] = useDeleteRequestMutation();
  const [ loading, setLoading ] = useState<boolean>(false);
  console.log(deleteRecord);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteInventory(`inventorys/${id}`);
      toast.success("Successfully Deleted");
    } catch (er) {
      toast.error("error");
    }
    setLoading(false);
    handleCancel();
  };
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#0000007A] z-50">
        <div className="bg-white flex flex-col items-center justify-center p-10 rounded-md w-1/3 gap-8">
            <p className="font-semibold text-lg leading-5">Are you sure to delete this?</p>
            <p className="font-medium leading-5">Data cannot be reterived once you have deleted. Only delete if you are aboslutely sure to.</p>
            <button className="w-full h-12 text-white bg-red-500 font-medium rounded disabled:bg-gray-500" disabled={ loading } onClick={() => handleDelete(deleteRecord)}>Yes, I am Sure.</button>
            <button className="w-full h-12 text-white bg-green-500 font-medium rounded" disabled={ loading }onClick={handleCancel}>No, Go Back.</button>
        </div>
    </div>
  );
};

export default DeleteAlert;
