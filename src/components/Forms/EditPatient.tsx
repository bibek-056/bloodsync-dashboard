import { useForm } from "react-hook-form";
import { useEditPatientMutation } from "../../api/apiHandler";
import { useState } from "react";

type EditData = {
    patientId: string;
    patientName: string;
    quantity: number;
    priorityId: string;
    inventoryId: string;
};

const EditPatientwaitlist: React.FC<CreatePatientProps> = ({
    editElement,
    handleCloseEdit,
}) => {
    const handleClose = () => {
        handleCloseEdit();
    };

    const form = useForm<EditData>();
    const { handleSubmit, register } = form;

    const [editInventory] = useEditPatientMutation();
    const [existingData, setExistingData] = useState<EditData | null>(null);

    const onSubmit = async (formData: EditData) => {
        try {
            await editInventory(formData);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to show existing data when needed
    const showExistingData = () => {
        setExistingData(editElement);
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000007A] z-50">
            <form
                className="w-1/2 bg-white p-8 rounded-lg shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-2xl font-semibold text-[#006EB9] mb-6">Edit Patientwaitlist</h2>
                {existingData ? (
                    <div>
                        <h3>Existing Data:</h3>
                        <p>Patient Name: {existingData.patientName}</p>
                        <p>Quantity: {existingData.quantity}</p>
                        <p>Priority: {existingData.priorityId}</p>
                        <p>Inventory Item: {existingData.inventoryId}</p>
                    </div>
                ) : null}
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Patient Name</label>
                    <input
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        defaultValue={editElement.patientName}
                        {...register("patientName")}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Quantity</label>
                    <input
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        type="number"
                        defaultValue={editElement.quantity}
                        {...register("quantity")}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Priority</label>
                    <input
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        defaultValue={editElement.priorityId}
                        {...register("priorityId")}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Inventory Item</label>
                    <input
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        defaultValue={editElement.inventoryId}
                        {...register("inventoryId")}
                    />
                </div>

                <div className="flex justify-between items-center">
                    <button
                        className="w-1/4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
                        type="submit"
                    >
                        Save Changes
                    </button>
                    <button
                        className="w-1/4 py-2 bg-slate-500 text-white rounded hover-bg-slate-600"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="w-1/4 py-2 bg-slate-500 text-white rounded hover-bg-slate-600"
                        onClick={showExistingData}
                    >
                        Show Existing Data
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPatientwaitlist;
