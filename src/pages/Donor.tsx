import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Loading from '../components/Loading/Loading';
import moment from 'moment';
import { useReadRequestQuery } from '../api/apiHandler';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Donors, DonorTable } from '../models/datamodels';
import DeleteDonor from '../components/Alert/DeleteDonor';
import { MdDelete, MdEditSquare } from 'react-icons/md';
interface Column {
  id:
    | 'index'
    | 'donorName'
    | 'bloodGroup'
    | 'lastDonated'
    | 'phoneNumber'
    | 'district'
    | 'municipality'
    | 'wardNo'
    | 'hospitalAffiliated'
    | 'emergencyContact'
    | 'registrationId'
    | 'actions';
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}
//  This is to define columns in the table
const columns: readonly Column[] = [
  {
    id: 'index',
    label: 'S.No',
    align: 'center',
  },
  {
    id: 'donorName',
    label: 'Donor',
    align: 'center',
  },
  { id: 'bloodGroup', label: 'Blood Group', align: 'center' },
  {
    id: 'lastDonated',
    label: 'Last Donated',
    align: 'center',
  },
  {
    id: 'phoneNumber',
    label: 'Phone Number',
    align: 'center',
  },
  {
    id: 'district',
    label: 'District',
    align: 'center',
  },
  {
    id: 'municipality',
    label: 'Municipality',
    align: 'center',
  },
  {
    id: 'wardNo',
    label: 'Ward No',
    align: 'center',
  },
  {
    id: 'hospitalAffiliated',
    label: 'Hospital Affiliated',
    align: 'center',
  },
  {
    id: 'registrationId',
    label: 'Registration Number',
    align: 'center',
  },
  {
    id: 'emergencyContact',
    label: 'Emergency Contact',
    align: 'center',
  },
  {
    id: 'actions',
    label: 'Actions',
    align: 'center',
  },
];
interface Data {
  index: number; // Add index property
  donorName: string;
  bloodGroup: string;
  lastDonated: string;
  phoneNumber: number;
  district: string;
  municipality: string;
  wardNo: number;
  hospitalAffiliated: string;
  registrationId: number;
  emergencyContact: number;
  actions: React.ReactNode;
}
function createData(
  index: number, // Add index parameter
  donorName: string,
  bloodGroup: string,
  lastDonated: string,
  phoneNumber: number,
  district: string,
  municipality: string,
  wardNo: number,
  hospitalAffiliated: string,
  registrationId: number,
  emergencyContact: number,
  actions: JSX.Element
): Data {
  return {
    index,
    donorName,
    bloodGroup,
    lastDonated,
    phoneNumber,
    district,
    municipality,
    wardNo,
    hospitalAffiliated,
    registrationId,
    emergencyContact,
    actions,
  };
}
function Donor() {
  const { data, isLoading, error } = useReadRequestQuery('donors');
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false); // Drawer state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [donorId, setDonorId] = React.useState('');
  const navigate = useNavigate();
  const handleOpenDeleteDialog = (id: string) => {
    setOpenDeleteDialog(true);
    setDonorId(id);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const rows = data?.map((item: Donors, index: number) => {
    return createData(
      index + 1,
      item.user.name,
      item.bloodGroup.bloodGroupName,
      moment(item.lastDonated).format('L'),
      item.phoneNumber,
      item.district,
      item.municipality,
      item.wardNo,
      item.hospital.hospitalName,
      item.registrationId,
      item.emergencyContact,
      <div className="flex w-full items-center gap-2 justify-between">
        <div
          className="flex w-10 h-10 rounded-full gap-2 justify-center items-center border-[3px] border-[#006EB9] shadow-md cursor-pointer "
          onClick={() => {
            navigate(`/donor/edit/${item.donorId}`);
          }}
        >
          <MdEditSquare className="text-xl font-medium text-[#006EB9] hover:text-2xl ease-in-out duration-100" />
        </div>
        <div
          className="flex w-10 h-10 rounded-full gap-2 justify-center items-center border-[3px] border-red-500 shadow-md cursor-pointer"
          onClick={() => {
            handleOpenDeleteDialog(item.user.userId);
          }}
        >
          <MdDelete className="text-xl font-medium text-red-500 hover:text-2xl ease-in-out duration-100" />
        </div>
      </div>
    );
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  console.log(data);
  if (error) {
    return <p>Contact your admin sorry</p>;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <div className="flex w-[100%] justify-between items-center">
          <input
            placeholder="Search Here"
            className="w-2/5 h-12 p-4 rounded border"
          ></input>
          <Link to="/create-donor">
            <button className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-[#006EB9] text-white font-medium m-5">
              <IoMdAddCircleOutline className="text-lg" /> Add New Donor
            </button>
          </Link>
        </div>

        <Paper
          sx={{
            backgroundColor: '#F1F5F9',
          }}
        >
          <TableContainer
            style={{
              backgroundColor: '#F1F5F9',
            }}
            sx={{ maxHeight: 600 }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: '#F1F5F9',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: DonorTable, index: number) => {
                    return (
                      <TableRow
                        hover
                        // tabIndex={-1}
                        key={row.index}
                        className={
                          index % 2 === 0 ? 'bg-white' : 'bg-slate-100'
                        }
                      >
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={index} align={column.align}>
                              {value}
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
            className="bg-slate-100"
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <DeleteDonor
            open={openDeleteDialog}
            onClose={handleCloseDeleteDialog}
            slug="users"
            id={donorId}
          />
        </Paper>
      </>
    );
  }
}
export default Donor;
