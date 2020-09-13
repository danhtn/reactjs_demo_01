import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = ((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  popupContent: {
    display: 'flex',
    flexDirection: 'inherit',
    paddingLeft: 250,
    paddingRight: 250
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class FullScreenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      customerData: { ...props.data }
    };
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChange = (event) => {
    this.setState({
      customerData: { ...this.state.customerData, [event.target.name]: event.target.value }
    })
  };

  handleSave = () => {
    this.setState({ isOpen: false });
    this.props.onUpdateCustomerData(this.state.customerData);
  };

  render() {
    const { classes, data } = this.props;
    const { customerData } = this.state;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {data?.customerId || 'Edit'}
        </Button>
        <Dialog fullScreen open={this.state.isOpen} onClose={this.handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit Customer
            </Typography>
              <Button autoFocus color="inherit" onClick={this.handleSave}>
                Save
            </Button>
            </Toolbar>
          </AppBar>
          <List className={classes.popupContent}>
            <TextField
              label="Cutomer ID"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled
              name={'customerId'}
              value={customerData.customerId}
            />
            <TextField
              label="Cutomer Name"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name={'customerName'}
              value={customerData.customerName}
              onChange={this.handleChange}
            />
            <TextField
              label="Cutomer Type"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled
              name={'customerType'}
              value={customerData.customerType}
            />
            <TextField
              label="Balance"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled
              name={'balance'}
              value={customerData.balance}
            />
            <TextField
              label="Cutomer Phone"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name={'phone'}
              value={customerData.phone}
              onChange={this.handleChange}
            />
            <TextField
              label="Cutomer Email"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name={'email'}
              value={customerData.email}
              onChange={this.handleChange}
            />
            <TextField
              label="Cutomer Address"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name={'address'}
              value={customerData.address}
              onChange={this.handleChange}
            />
            <TextField
              label="Status"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled
              name={'status'}
              value={customerData.status}
            />
            <TextField
              label="Account Number"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled
              name={'accountNumber'}
              value={customerData.accountNumber}
            />
            <TextField
              label="Gender"
              style={{ margin: '5px 10px' }}
              placeholder=""
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              disabled
              name={'gender'}
              value={customerData.gender}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => {
                this.props.onDeleteCustomerData(customerData.customerId);
              }}
            >
              Delete
            </Button>
          </List>
        </Dialog>
      </div >
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);