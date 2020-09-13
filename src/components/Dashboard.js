import React from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import Users from './Users';
import Chart from './Chart';
import CustomDownload from './CustomColumns';
import { getUsers, loadConfig } from '../actions/Actions';

const styles = ((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100%)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      chartData: [
        { name: 'VIP Customers', value: 0 },
        { name: 'Loyal Customers', value: 0 },
        { name: 'Normal Customers', value: 0 },
        { name: 'New Customers', value: 0 },
      ]
    }
  }

  componentDidMount() {
    loadConfig();
    getUsers().then(res => {
      const chartData = this.countCustomerType(res.data);
      this.setState({ customers: res.data, chartData });
    }).catch(error => {
      console.log('getUsers -> error', error);
    })
  }

  countCustomerType = (customers) => {
    const temp = {
      vipCustomers: 0,
      loyalCustomers: 0,
      normalCustomers: 0,
      newCustomers: 0
    };
    customers.forEach(element => {
      switch (element.customerType) {
        case 'A':
          temp.vipCustomers++
          break
        case 'B':
          temp.loyalCustomers++
          break
        case 'C':
          temp.normalCustomers++
          break
        case 'D':
          temp.newCustomers++
          break
        default:
          break
      }
    });
    return [
      { name: 'VIP Customers', value: temp.vipCustomers },
      { name: 'Loyal Customers', value: temp.loyalCustomers },
      { name: 'Normal Customers', value: temp.normalCustomers },
      { name: 'New Customers', value: temp.newCustomers },
    ];
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              // onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
          </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper className={fixedHeightPaper}>
                  <Chart chartData={this.state.chartData} />
                  {/* <MainTabs /> */}
                </Paper>
              </Grid>
              {/* List Users */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Users customers={this.state.customers} />
                </Paper>
              </Grid>
              {/* Chart */}
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <CustomDownload customers={this.state.customers} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
