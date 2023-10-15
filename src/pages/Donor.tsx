import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Loading from '../components/Loading';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { toast } from 'react-toastify';
import {
  useDeleteRequestMutation,
  useReadRequestQuery,
} from '../api/apiHandler';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
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
    emergencyContact,
    actions,
  };
}
function Donor() {
  const { data, isLoading } = useReadRequestQuery('donors');
  const [deleteDonor] = useDeleteRequestMutation();
  const [openDrawer, setOpenDrawer] = React.useState(false); // Drawer state
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [donorId, setDonorId] = React.useState('');
  const handleOpenDrawer = (id: string) => {
    setOpenDrawer(true);
    setDonorId(id);
    console.log(donorId);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const rows = data?.map((item: any, index: number) => {
    return createData(
      index + 1,
      item.user.name,
      item.bloodGroup.bloodGroupName,
      item.lastDonated,
      item.phoneNumber,
      item.district,
      item.municipality,
      item.wardNo,
      item.hospital.hospitalName,
      item.emergencyContact,
      <div className="flex gap-2 justify-around items-center">
        <DeleteIcon
          onClick={() => handleOpenDrawer(item.donorId)}
          className="cursor-pointer text-red-600"
        />
        <BorderColorIcon className="cursor-pointer" />
      </div>
    );
  });

  async function handleDelete(slug: string, id: string) {
    try {
      await deleteDonor(`${slug}/${id}`).unwrap();
      toast.success('Sucessfully Deleted');
    } catch (er) {
      toast.error(`Failed to delete ${er} `);
    }
  }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex w-[100%] justify-between items-center">
        <input
          placeholder="Search Here"
          className="w-2/5 h-12 p-4 rounded border"
        ></input>
        {/* <BigButton/> */}
        <Link to="/create-donor">
          <button
            className="flex items-center justify-center gap-2 border w-64 h-12 rounded p-4 bg-green-500 text-white font-medium m-5"
            // onClick={handleOpenForm}
          >
            <IoMdAddCircleOutline className="text-lg" /> Add New Donor
          </button>
        </Link>
      </div>

      <Paper sx={{ width: 'auto', backgroundColor: '#F1F5F9' }}>
        <TableContainer
          style={{
            backgroundColor: '#F1F5F9',
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{
                      // minWidth: column.minWidth,
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
                .map((row, index: number) => {
                  return (
                    <TableRow
                      hover
                      // tabIndex={-1}
                      key={row.index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}
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
        <Dialog
          open={openDrawer}
          onClose={handleCloseDrawer}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Record</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDrawer}>Cancel</Button>
            <Button
              onClick={() => {
                handleCloseDrawer();
                handleDelete('donors', donorId);
              }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </>
  );
}
export default Donor;
