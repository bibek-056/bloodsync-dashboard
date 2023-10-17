import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useReadRequestQuery } from '../api/apiHandler';
import Loading from '../components/Loading/Loading';
import AddHospital from '../components/Forms/AddHospital';
import { IoPersonAdd } from 'react-icons/io5';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Column {
  id: 'name' | 'address' | 'contact' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: 'name',
    label: 'Hospital Name',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'address',
    label: 'Hospital Address',
    minWidth: 50,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'contact',
    label: 'Hospital Contact',
    minWidth: 120,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'actions',
    label: 'Actions',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  name: string;
  address: string;
  contact: string;
  actions: any;
}

function createData(
  name: string,
  address: string,
  contact: string,
  actions: any
): Data {
  return { name, address, contact, actions };
}

export default function Hospital() {
  const [createForm, setCreateForm] = useState<boolean>(false);

  const { data: hospitalData, isLoading } = useReadRequestQuery('hospitals');

  const rows = hospitalData?.map((item: any) => {
    return createData(
      item.hospitalName,
      item.hospitalAddress,
      item.contactInfo,
      <div className="flex gap-2 justify-between items-center">
        <Link
          to="/HospitalProfile"
          className="border w-full h-10 rounded p-2 bg-[#006EB9] text-white font-medium"
        >
          <button>Hospital Profile</button>
        </Link>
        <button className="border w-full h-10 rounded p-2 bg-red-500 text-white font-medium">
          Delete
        </button>
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

  const [createAddHospital, setCreateAddHospital] = useState<boolean>(false);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex w-full justify-between items-center">
        <input
          placeholder="Search Here"
          className="w-2/5 h-12 p-4 rounded border"
        ></input>

        <button
          className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-purple-500 text-white font-medium m-5"
          onClick={handleOpenForm}
        >
          <IoPersonAdd className="text-lg" /> Add New Hospital
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
                  .map((row: any, index: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row?.name}
                        className={index % 2 == 0 ? 'bg-white' : 'bg-slate-100'}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
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
      {createForm && <AddHospital handleOpenForm={handleOpenForm} />}
    </>
  );
}
