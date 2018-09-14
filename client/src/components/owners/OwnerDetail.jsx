import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import PetEditDialogContainer from '../pets';

const styles = theme => ({
  button: {
    margin: 0,
    padding: 0
  },
  headline: {
    marginTop: theme.spacing.unit * 2
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit,
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

const OwnerDetail = ({
  classes,
  isDialogOpen,
  handleCloseDialog,
  handleOpenDialog,
  owner,
  selectedPetId
}) => (
  <div className={classes.root}>
    <Typography className={classes.headline} variant="headline" color="inherit">
      Pets
    </Typography>
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Birthdate</TableCell>
            <TableCell>Type</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {owner.pets.map(pet => (
            <TableRow key={pet.id}>
              <TableCell>{pet.name}</TableCell>
              <TableCell>{pet.birthDate}</TableCell>
              <TableCell>{pet.type.name}</TableCell>
              <TableCell>
                <Button
                  color="primary"
                  className={classes.button}
                  onClick={handleOpenDialog(pet.id)}
                >
                  View/Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    {selectedPetId && (
      <PetEditDialogContainer
        handleCloseDialog={handleCloseDialog}
        isDialogOpen={isDialogOpen}
        petId={selectedPetId}
        ownerId={owner.id}
      />
    )}
  </div>
);

OwnerDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleOpenDialog: PropTypes.func.isRequired,
  selectedPetId: PropTypes.number,
  owner: PropTypes.object.isRequired
};

OwnerDetail.defaultProps = {
  selectedPetId: undefined
};

export default withStyles(styles)(OwnerDetail);
