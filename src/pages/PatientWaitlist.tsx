import * as React from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IoPersonAdd } from 'react-icons/io5';
import { useDeleteRequestMutation, useReadRequestQuery } from "../api/apiHandler";
import CreatePatient from "../components/Forms/AddPatient";
import DeleteAlert from "../components/Alert/DeleteAlert";
import EditPatientwaitlist from '../components/Forms/EditPatient';
import moment from "moment";
import { MdEditSquare, MdDelete } from "react-icons/md";


interface Column {
  id:
  | 'sno'
  | 'patientName'
  | 'inventoryItem'
  | 'priority'
  | 'hospital'
  | 'duedate'
  | 'dateCreated'
  | 'actions';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: any) => string;
}

interface CreateInventoryProps {
  handleOpenForm: () => void;
}

const columns: readonly Column[] = [
  { id: 'sno', label: 'S.No', minWidth: 50, align: 'center' },
  { id: 'patientName', label: 'Patient Name', minWidth: 170, align: 'center' },
  {
    id: 'inventoryItem',
    label: 'Inventory Name',
    minWidth: 100,
    align: 'center',
  },
  { id: 'priority', label: 'Case Types', minWidth: 100, align: 'center' },
  {
    id: 'hospital',
    label: 'Hospital Name',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'duedate',
    label: 'Due Date',
    minWidth: 100,
    align: 'center',
  },
  { id: 'dateCreated', label: 'Date Created', minWidth: 150, align: 'center' },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value: any) => value,
  },
];

interface Data {
  sno: number;
  patientName: string;
  inventoryItem: string;
  priority: string;
  hospital: string;
  duedate: Date;
  dateCreated: string;
  actions: React.ReactNode;
}

function createData(
  sno: number,
  patientName: string,
  inventoryItem: string,
  priority: string,
  hospital: string,
  duedate: Date,
  dateCreated: string,
  actions: any
): Data {
  return {
    sno,
    patientName,
    inventoryItem,
    priority,
    hospital,
    duedate,
    dateCreated,
    actions
  };
}

export default function PatientDataTable() {

  const [createAddForm, setCreateAddForm] = useState<boolean>(false);
  const [editQuantity, setEditQuantity] = useState<any>(null);
  const [deleteData, setDeleteData] = useState<string>("");


  const { data } = useReadRequestQuery('patientwaitlists');
  console.log(data);
  const [] = useDeleteRequestMutation();

  const handleDelete = async (id: string) => {
    setDeleteData(id);
  }

  const handleCancel = () => {
    setDeleteData(" ");
  }

  let snoCounter = 1;
  
  const rows = data?.map((item: any) => {
    const sno = snoCounter++; // Increment the counter for each row
    return createData(
      sno,
      item.patientName,
      item.inventory.inventoryName,
      item.priority.priorityLevelName,
      item.hospital.hospitalName,
      item.dueDate,
     item.dateModified
        ? moment(item.dateModified).format("L")
        : moment(item.dateCreated).format("L"),
<div className="flex justify-center gap-4 items-center">
        <div
          className="flex w-10 h-10 rounded-full gap-2 justify-center items-center border-[3px] border-[#006EB9] shadow-md cursor-pointer"
          onClick={() => handleEditQuantity(item)}
        >
          <MdEditSquare className="text-xl font-medium text-[#006EB9] hover:text-2xl ease-in-out duration-100" />
        </div>
        <div
          className="flex w-10 h-10 rounded-full gap-2 justify-center items-center border-[3px] border-red-500 shadow-md cursor-pointer"
          onClick={() => handleDelete(item.patientId)}
        >
          <MdDelete className="text-xl font-medium text-red-500 hover:text-2xl ease-in-out duration-100" />
        </div>
      </div>
    );
  });


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };;

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleAddForm(event: React.MouseEvent<HTMLButtonElement>) {
    setCreateAddForm(!createAddForm);
  }

  function handleCloseEdit(event: React.MouseEvent<HTMLButtonElement>) {
    setEditQuantity(null);
  }

  const handleEditQuantity = (item: any) => {
    setEditQuantity(item);
  };


  return (
    <>
      <div className="flex w-full justify-between items-center">
        <input
          placeholder="Search Here"
          className="w-2/5 h-12 p-4 rounded border"
        ></input>

        <button
          className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-purple-500 text-white font-medium m-5"
          onClick={handleAddForm}
        >
          <IoPersonAdd className="text-lg" /> Add New Patient
        </button>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: '75vh' }}>
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
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-100'
                        }
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : typeof value === 'object' && value instanceof Date
                                  ? value.toLocaleString()
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
      </Paper>
      {createAddForm && <CreatePatient handleOpenForm={handleAddForm} />}
      {editQuantity && (
        <EditPatientwaitlist
          editElement={editQuantity}
          handleCloseEdit={handleCloseEdit}
        />
      )}
      {deleteData && (
        <DeleteAlert deleteRecord={deleteData} handleCancel={handleCancel} />
      )}


    </>
  );
}

