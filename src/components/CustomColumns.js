import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { CSVLink } from 'react-csv';
import _ from 'underscore';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formGroup: {
    flexDirection: "row"
  }
});

class CustomDownload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unCheckedColumns: []
    }
  }

  handleChange = (event) => {
    const { unCheckedColumns } = this.state;
    let newColumns = [];
    if (event.target.checked) {
      newColumns = unCheckedColumns.filter(element => element !== event.target.name);
    } else {
      newColumns = [...unCheckedColumns, event.target.name];
    }
    this.setState({ unCheckedColumns: newColumns });
  };

  render() {
    const { classes, customers, customerSettings } = this.props;
    const { unCheckedColumns } = this.state;
    // Filter customer data via checked unCheckedColumns
    const filteredCustomer = customers.map(element => {
      return _.omit(element, unCheckedColumns);
    });

    const formGroup = customerSettings.map((col, i) => {
      const unChecked = unCheckedColumns.includes(col.name);
      return (
        <FormControlLabel
          key={i}
          control={<Checkbox checked={!unChecked} onChange={this.handleChange} name={col.name} />}
          label={col.displayText}
        />
      );
    });
    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Select columns to download</FormLabel>
          <FormGroup className={classes.formGroup}>
            {formGroup}
          </FormGroup>
          <FormHelperText>
            <CSVLink data={filteredCustomer}>Download me</CSVLink>
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
}

CustomDownload.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    customerSettings: state.rootReducer.customerSettings || [],
  };
}

export default connect(mapStateToProps)(withStyles(styles)(CustomDownload));
