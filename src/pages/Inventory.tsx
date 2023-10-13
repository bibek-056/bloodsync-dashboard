import * as React from "react";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { AddButton, BigButton, DeleteButton } from "../components/Buttons";
import { useReadRequestQuery } from "../api/apiHandler";
import { IoMdAddCircleOutline } from "react-icons/io";
import CreateInventory from "../components/Forms/CreateInventory";

interface Column {
  id: "inventoryItem" | "bloodGroup" | "amount" | "lastUsed" | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "inventoryItem",
    label: "Inventory Item",
    minWidth: 170,
    align: "center",
  },
  { id: "bloodGroup", label: "Blood Group", minWidth: 50, align: "center" },
  {
    id: "amount",
    label: "Amount",
    minWidth: 120,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "lastUsed",
    label: "Last Used",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  inventoryItem: string;
  bloodGroup: string;
  amount: number;
  lastUsed: number;
  actions: any;
}

function createData(
  inventoryItem: string,
  bloodGroup: string,
  amount: number,
  lastUsed: any,
  actions: any
): Data {
  return { inventoryItem, bloodGroup, amount, lastUsed, actions };
}

export default function Inventory() {
  const { data: inventoryData } = useReadRequestQuery("inventorys");

  const rows = inventoryData?.map((item: any) => {
    return createData(
      item.inventoryName,
      item.bloodGroup.bloodGroupName,
      item.quantity,
      item.dateModified ? item.dateModified : item.dateCreated,
      <div className="flex gap-2 justify-between items-center">
        <AddButton />
        <DeleteButton />
      </div>
    );
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [createForm, setCreateForm] = useState<boolean>(false);

  function handleOpenForm(event: React.MouseEvent<HTMLButtonElement>) {
    setCreateForm(!createForm);
  }

  return (
    <>
      <div className="flex w-full justify-between items-center">
        <input
          placeholder="Search Here"
          className="w-2/5 h-12 p-4 rounded border"
        ></input>
        <button
          className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-green-500 text-white font-medium m-5"
          onClick={handleOpenForm}
        >
          <IoMdAddCircleOutline className="text-lg" /> Add New Inventory
        </button>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "75vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.inventoryItem}
                        className={index % 2 == 0 ? "bg-white" : "bg-slate-100"}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {createForm && <CreateInventory /> }
    </>
  );
}
