import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    useEditPatientMutation,
    useReadRequestQuery,
} from "../../api/apiHandler";

type EditData = {
    patientId: string;
    patientName: string;
    quantity: string;
    priorityId: string;
    inventoryId: string;
};

const EditPatientwaitlist: React.FC<CreatePatientProps> = ({
    editElement,
    handleCloseEdit,
}) => {
    const { handleSubmit, register, setValue } = useForm<EditData>();
    const [editPatient] = useEditPatientMutation();
    const { data: priorities } = useReadRequestQuery("Priority");
    const { data: inventoryItems } = useReadRequestQuery("inventorys");

    useEffect(() => {
        if (editElement) {
            setValue("patientName", editElement.patientName);
            setValue("quantity", editElement.quantity);
            setValue("priorityId", editElement.priorityId);
            setValue("inventoryId", editElement.inventoryId);
        }
    }, [editElement, setValue]);

    const onSubmit = async (editData: EditData) => {
        console.log(editData);
        const updatedData = {
            ...editData,
        };
        try {
            await editPatient(updatedData);
        } catch (error) {
            console.log(error);
        }
        handleCloseEdit();
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-[#0000007A] z-50">
            <form
                className="w-1/2 bg-white p-8 rounded-lg shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-2xl font-semibold text-[#006EB9] mb-6">
                    Edit Patientwaitlist
                </h2>
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">
                        Patient Name
                    </label>
                    <input
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        {...register("patientName")}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Quantity</label>
                    <input
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        type="string"
                        {...register("quantity")}
                    />
                </div>
                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Priority</label>
                    <select
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        {...register("priorityId")}
                    >
                        {priorities?.map((item, index) => (
                            <option key={index} value={item.priorityId} selected={item.priorityId === editElement.priorityId} onClick={() => {console.log(item.priorityId)}}>
                                {item.priorityLevelName}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="mb-4">
                    <label className="text-sm text-[#006EB9] block mb-2">Inventory Item</label>
                    <select
                        className="w-full border-b-2 border-[#006EB9] py-2"
                        {...register("inventoryId")}
                    >
                        {inventoryItems?.map((item, index) => (
                            <option
                                key={index}
                                value={item.inventoryId}
                                selected={item.inventoryId === editElement.inventoryId}
                                onChange={() => {console.log(item.inventoryId)}}
                            >
                                {item.inventoryName}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="flex justify-between items-center">
                    <button
                        className="w-1/4 py-2 bg-[#006EB9] text-white rounded hover:bg-[#0056A9]"
                        type="submit"
                    >
                        Save Changes
                    </button>
                    <button
                        className="w-1/4 py-2 bg-slate-500 text-white rounded hover:bg-slate-600"
                        onClick={handleCloseEdit}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPatientwaitlist;


