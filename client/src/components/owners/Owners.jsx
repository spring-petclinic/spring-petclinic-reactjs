import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

const preventAndSearch = handler => e => {
  e.preventDefault();
  handler();
};

const Owners = ({ classes, handleSearchOwners, handleUpdateQuery, owners }) => (
  <div>
    <form
      className={classes.container}
      noValidate
      autoComplete="off"
      onSubmit={preventAndSearch(handleSearchOwners)}
    >
      <TextField
        label="Last Name"
        className={classes.textField}
        margin="normal"
        onChange={handleUpdateQuery}
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSearchOwners}
      >
        Search
      </Button>
    </form>
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell numeric>Address</TableCell>
            <TableCell numeric>City</TableCell>
            <TableCell numeric>Phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {owners.map(owner => (
            <TableRow key={owner.id}>
              <TableCell>
                <Link to={`/owners/${owner.id}`}>
                  {`${owner.firstName} ${owner.lastName}`}
                </Link>
              </TableCell>
              <TableCell numeric>{owner.address}</TableCell>
              <TableCell numeric>{owner.city}</TableCell>
              <TableCell numeric>{owner.telephone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

Owners.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSearchOwners: PropTypes.func.isRequired,
  handleUpdateQuery: PropTypes.func.isRequired,
  owners: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default withStyles(styles)(Owners);
