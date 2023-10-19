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
import { IoMdAddCircleOutline } from "react-icons/io";
import AddAdmin from "../components/Forms/AddAdmin";
import { useDeleteAdminMutation, useReadRequestQuery } from "../api/apiHandler";
import DeleteAdmin from "../components/Alert/DeleteAdmin";
import EditHospital from "../components/Forms/EditAdmin";
import { MdEditSquare, MdDelete } from "react-icons/md";

interface Column {
  id: "name" | "email" | "address" | "hospitalName" | "userType" | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    minWidth: 50,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 120,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "hospitalName",
    label: "Organization Name",
    minWidth: 170,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },

  {
    id: "userType",
    label: "User Type",
    minWidth: 120,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 120,
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

interface Data {
  name: string;
  email: string;
  address: string;
  hospitalName: string;
  userType: string;
  actions: any;
}

function createData(
  name: string,
  email: string,
  address: string,
  hospitalName: string,
  userType: string,
  actions: any
): Data {
  return { name, email, address, hospitalName, userType, actions };
}

export default function Admin() {
  const [createForm, setCreateForm] = useState<boolean>(false);
  const [deleteRecord, setDeleteRecord] = useState<string>("");
  const [editQuantity, setEditQuantity] = useState<any>(null);
  const { data: adminData } = useReadRequestQuery("users");
  const userTypesToDisplay = ["Nagarpalika Admin", "Redcross Admin", "Hospital Admin"];


  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDelete = async (id: string) => {
    setDeleteRecord(id);
  };

  const handleCancel = () => {
    setDeleteRecord("");
  };

  const rows = adminData?.filter((item) => userTypesToDisplay.includes(item.userType.userTypeName)).map((item: any) => {
    return createData(
      item.name,
      item.email,
      item.address,
      item.hospital.hospitalName,
      item.userType.userTypeName,
      <div className="flex w-full items-center justify-evenly">
        <div
          className="flex w-10 h-10 rounded-full gap-2 justify-center items-center border-[3px] border-[#006EB9] shadow-md cursor-pointer"
          onClick={() => handleEditQuantity(item)}
        >
          <MdEditSquare className="text-xl font-medium text-[#006EB9] hover:text-2xl ease-in-out duration-100" />
        </div>
        <div
          className="flex w-10 h-10 rounded-full gap-2 justify-center items-center border-[3px] border-[#006EB9] shadow-md cursor-pointer"
          onClick={() => handleDelete(item.userId)}
        >
          <MdDelete className="text-xl font-medium text-red-500 hover:text-2xl ease-in-out duration-100" />
        </div>
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

  function handleOpenForm(event: React.MouseEvent<HTMLButtonElement>) {
    setCreateForm(!createForm);
  }

  function handleCloseEdit(event: React.MouseEvent<HTMLButtonElement>) {
    setEditQuantity(null);
  }

  const handleEditQuantity = (item: any) => {
    setEditQuantity(item);
  };

  return (
    <>
      <div className="flex w-full justify-between items-center px-5 py-3">
        <input
          placeholder="Search Here"
          className="w-2/5 h-12 p-4 rounded border"
        ></input>
        <button
          className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-[#006EB9] text-white font-medium"
          onClick={handleOpenForm}
        >
          <IoMdAddCircleOutline className="text-lg" /> Add New Admin
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
                        key={row.name}
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

      {createForm && <AddAdmin handleOpenForm={handleOpenForm} />}
      {deleteRecord && (
        <DeleteAdmin deleteRecord={deleteRecord} handleCancel={handleCancel} />
      )}

      {editQuantity && (
        <EditHospital
          editElement={editQuantity}
          handleCloseEdit={handleCloseEdit}
        />
      )}
    </>
  );
}
