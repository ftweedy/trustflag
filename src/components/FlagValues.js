import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, parkLocation, gpsCoordinates, poi, poiLicense, poiAddress, poiPhone, notes) {
  return { id, date, parkLocation, gpsCoordinates, poi, poiLicense, poiAddress, poiPhone, notes };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Kruger National Park', '23.9884 S, 31.5547 E', 'John Doe', 2347128, 'N/A','N/A', 'N/A' ),
  createData(1, '16 Mar, 2019', 'Addo Elephant National Park', '33.4834 S, 25.7506 E', 'Raymond', 2133213, 'N/A','N/A', 'N/A'),
  createData(2, '16 Mar, 2019', 'Kruger National Park', '23.9884 S, 31.5547 E', 'Serg', 1232312, 'N/A','N/A', 'N/A'),
  createData(3, '16 Mar, 2019', 'Addo Elephant National Park', '33.4834 S, 25.7506 E', 'Mark', 1232132, 'N/A','N/A', 'N/A'),
  createData(4, '15 Mar, 2019', 'Kruger National Park', '23.9884 S, 31.5547 E', 'Donald', 2133123, 'N/A','N/A', 'N/A'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Flags</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Expiration Date</TableCell>
            <TableCell>Park Location</TableCell>
            <TableCell>GPS Coordinates</TableCell>
            <TableCell>Person Of Interest (POI)</TableCell>
            <TableCell>POI License Plate Number</TableCell>
            <TableCell>POI Address</TableCell>
            <TableCell>POI Phone Number</TableCell>
            <TableCell>Notes</TableCell>
        
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.parkLocation}</TableCell>
              <TableCell>{row.gpsCoordinates}</TableCell>
              <TableCell>{row.poi}</TableCell>
              <TableCell>{row.poiLicense}</TableCell>
              <TableCell>{row.poiAddress}</TableCell>
              <TableCell>{row.poiPhone}</TableCell>
              <TableCell align="right">{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}