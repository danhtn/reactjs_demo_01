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
import FullScreenDialog from './FullScreenDialog';

const styles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  customWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  buttonAdd: {
    width: '100px',
    right: '-200px',
    top: '-10px'
  }
});

class Customers extends React.Component {
  onUpdateCustomerData = (data) => {
    const newCustomers = this.props.customers.map((element) => {
      if (element.customerId === data.customerId) {
        return data
      } else {
        return element
      }
    });
    this.props.onUpdateCustomers(newCustomers)
  }
  onDeleteCustomerData = (customerId) => {
    const newCustomers = this.props.customers.filter(customer => customer.customerId !== customerId);
    this.props.onUpdateCustomers(newCustomers)
  }
  render() {
    const { classes, customerSettings, customers } = this.props;
    const tableHeader = customerSettings.map((col, i) => {
      return (
        <TableCell key={i}>{col.displayText}</TableCell>
      );
    });

    const tableContent = customers.map((row) => (
      <TableRow key={row.customerId}>
        <TableCell>
          <FullScreenDialog
            data={row}
            onUpdateCustomerData={this.onUpdateCustomerData}
            onDeleteCustomerData={this.onDeleteCustomerData}
          />
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
        <div className={classes.customWrapper}>
          <Title>List Customers</Title>
          {/* <Button
            variant="outlined"
            color="primary"
            className={classes.buttonAdd}
            onClick={(event) => {
              console.log('KGIT-TED: Customers -> render -> event', event);
            }}>
            Add
          </Button> */}
        </div>
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
      </React.Fragment >
    );
  }
}

Customers.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    customerSettings: state.rootReducer.customerSettings || [],
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Customers));
