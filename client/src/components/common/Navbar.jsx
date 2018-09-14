import { AppBar, Button, Toolbar } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

const Navbar = ({ classes }) => (
  <AppBar position="absolute" color="primary" className={classes.root}>
    <Toolbar>
      <Button color="inherit" component={Link} to="/owners">
        Pet Clinic
      </Button>
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
