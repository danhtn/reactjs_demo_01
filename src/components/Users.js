import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { Link } from 'react-router-dom';

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
});

class Users extends React.Component {
  render() {
    const { customerSettings, customers } = this.props;
    // const { customers } = this.state;
    const tableHeader = customerSettings.map((col, i) => {
      return (
        <TableCell key={i}>{col.displayText}</TableCell>
      );
    });

    const tableContent = customers.map((row) => (
      <TableRow key={row.customerId}>
        <TableCell>
          <Link
            component="button"
            variant="body2"
            onClick={(event) => {
              // event
            }}
          >
            {row.customerId}
          </Link>
        </TableCell>
        <TableCell>{row.customerName}</TableCell>
        <TableCell>{row.customerType}</TableCell>
        <TableCell>{row.balance}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.address}</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>{row.accountNumber}</TableCell>
        <TableCell>{row.gender}</TableCell>
      </TableRow>
    ))

    return (
      <React.Fragment>
        <Title>List Users</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              {tableHeader}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableContent}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    customerSettings: state.rootReducer.customerSettings || [],
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Users));
