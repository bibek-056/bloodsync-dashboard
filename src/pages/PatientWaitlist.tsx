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
import {
  DeleteButton,
  EditButton,
} from "../components/Buttons";
import AddPatientButton from "../components/Buttons";
import AddForm from "../components/Forms/AddPatient";
import { useReadRequestQuery } from "../api/apiHandler";

interface Column {
  id:
    | "sno"
    | "patientName"
    | "inventoryItem"
    | "dateCreated"
    | "priority"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: any) => string;
}

const columns: Column[] = [
  { id: "sno", label: "S.No", minWidth: 50, align: "center" },
  { id: "patientName", label: "Patient Name", minWidth: 170, align: "center" },
  {
    id: "inventoryItem",
    label: "Inventory Item",
    minWidth: 100,
    align: "center",
  },
  { id: "dateCreated", label: "Date Created", minWidth: 150, align: "center" },
  { id: "priority", label: "Priority", minWidth: 100, align: "center" },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "center",
    format: (value: any) => value,
  },
];

interface Data {
  sno: number;
  patientName: string;
  inventoryItem: string;
  dateCreated: string;
  priority: string;
  actions: React.ReactNode;
}

function createData(
  sno: number,
  patientName: string,
  inventoryItem: string,
  dateCreated: string,
  priority: string,
  actions: React.ReactNode
): Data {
  return {
    sno,
    patientName,
    inventoryItem,
    dateCreated,
    priority,
    actions,
  };
}

export default function PatientDataTable() {
  const { data } = useReadRequestQuery("patientwaitlists");

  let snoCounter = 1;
  const rows = data?.map((item: any) => {
    const sno = snoCounter++; // Increment the counter for each row
    return createData(
      sno,
      item.patientName,
      item.inventory.inventoryName,
      item.dateModified ? item.dateModified : item.dateCreated,
      item.priority.priorityLevelName,
      <div className="flex gap-2 justify-between items-center">
        <DeleteButton />
        <EditButton />
      </div>
    );
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [showForm, setShowForm] = useState(false);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    console.log("Button clicked. showForm:", showForm);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {showForm ? (
        <AddForm />
      ) : (
        <>
          <AddPatientButton onClick={toggleForm} />
          <TableContainer
            sx={{ maxHeight: "75vh" }}
            className="border border-black"
          >
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
                    .map((row: Data, index: number) => {
                      return (
                        <TableRow
                          key={row.sno}
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-slate-100"
                          }
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
            count={rows?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Paper>
  );
}
