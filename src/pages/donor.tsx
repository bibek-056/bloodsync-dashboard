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
import { useReadRequestQuery } from '../api/apiHandler';

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
  const rows = data?.map((item: any, index: number) => {
    return createData(
      index,
      item.user.name,
      item.bloodGroup.bloodGroupName,
      item.lastDonated,
      item.phoneNumber,
      item.district,
      item.municipality,
      item.wardNo,
      item.hospital.hospitalName,
      item.emergencyContact,
      <div className="flex justify-around items-center">
        <DeleteIcon className="cursor-pointer" />
        <BorderColorIcon className="cursor-pointer" />
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
  return isLoading ? (
    <Loading />
  ) : (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer
        style={{
          backgroundColor: '#F1F5F9',
        }}
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
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
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
    </Paper>
  );
}

export default Donor;
