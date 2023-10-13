export type InventoryData = {
    inventoryName: string;
    bloodGroupId: number;
    quantity: number;
};

export type EditInventory = {
    inventoryId: string;
    inventoryName: string;
    quantity: number;
    bloodGroupId: string;
}