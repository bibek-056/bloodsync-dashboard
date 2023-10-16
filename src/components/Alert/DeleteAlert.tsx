import { useDeleteRequestMutation } from "../../api/apiHandler";
import { toast } from "react-toastify";
import { useState } from "react";

const DeleteAlert = ({ deleteRecord, handleCancel }) => {
  const [deleteInventory] = useDeleteRequestMutation();
  const [deletePatientWaitlist] = useDeleteRequestMutation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteInventory = async (id: string) => {
    setLoading(true);
    try {
      await deleteInventory(`inventorys/${id}`);
      toast.success("Successfully Deleted from Inventory");
    } catch (error) {
      toast.error("Error deleting from Inventory");
    }
    setLoading(false); 
    handleCancel();
  };

  const handleDeletePatientWaitlist = async (id: string) => {
    setLoading(true);
    try {
      await deletePatientWaitlist(`patientwaitlists/${id}`);
      toast.success("Successfully Deleted from Patient Waitlist");
    } catch (error) {
      toast.error("Error deleting from Patient Waitlist");
    }
    setLoading(false); 
    handleCancel();
  };

  const handleDeleteBoth = () => {
    handleDeleteInventory(deleteRecord);
    handleDeletePatientWaitlist(deleteRecord);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-60 bg-gray-900">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this record?</p>
        <div className="flex justify-between">
          <button
            className="w-44 h-12 text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-300"
            disabled={loading}
            onClick={handleDeleteBoth}
          >
            {loading ? "Deleting..." : "Yes, I'm Sure"}
          </button>
          <button
            className="w-44 h-12 text-white bg-green-500 rounded hover-bg-green-600 transition-colors duration-300"
            disabled={loading}
            onClick={handleCancel}
          >
            No, Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlert;
