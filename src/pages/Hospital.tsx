import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AddButton, DeleteButton } from '../components/Buttons';

// Interface for the data object structure
interface Data {
  name: string;
  address: string;
  contact: string;
  action: JSX.Element;
  history: {
    adminName: string;
    adminEmail: string;
  }[];
}

// Function to create data objects
function createData(name: string, address: string, contact: string): Data {
  return {
    name,
    address,
    contact,
    action: (
      <div className="flex gap-2 justify-between items-center">
        <AddButton /> <DeleteButton />{' '}
      </div>
    ),
    history: [
      {
        adminName: 'Rakesh Shah',
        adminEmail: 'raku211@gmail.com',
      },
    ],
  };
}

// Interface for Row component props
interface RowProps {
  row: Data;
}

// Row component
function Row(props: RowProps) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" className="font-black	">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.contact}</TableCell>
        <TableCell align="right">{row.action}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h3" gutterBottom component="div">
                Hospital Admin
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className="bg-blue-300 text-3xl">
                    <TableCell style={{ fontWeight: 'bold' }}>Nname</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.adminName}>
                      <TableCell component="th" scope="row">
                        {historyRow.adminName}
                      </TableCell>
                      <TableCell>{historyRow.adminEmail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Array of data rows
const rows: Data[] = [
  createData('CHR', 'rukum', '9861128974'),
  createData('ABC', 'rukum', '9861128974'),
  createData('XYZ', 'rukum', '9861128974'),
];

// Hospital component
function Hospital() {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: '75vh' }}
      className="border border-black font-bold"
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }}>Name </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Address
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Contact
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Hospital;
