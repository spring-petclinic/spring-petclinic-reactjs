import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Slide,
  TextField,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import TodayIcon from '@material-ui/icons/TodayOutlined';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import getToday from '../../util/getToday';

const Transition = props => <Slide direction="up" {...props} />;

const styles = theme => ({
  button: {
    margin: 0,
    padding: 0
  },
  dialog: {
    minWidth: 500
  },
  form: { display: 'flex', flexDirection: 'column' },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
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
  }
});

const PetEditDialog = ({
  classes,
  isDialogOpen,
  handleCloseDialog,
  handleUpdateSelectedVet,
  handleUpdateSelectedDate,
  handleUpdateSelectedTimeSlot,
  selectedDate,
  selectedVet,
  selectedTimeSlot,
  visitDetails
}) => (
  <Dialog
    open={isDialogOpen}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleCloseDialog}
    aria-labelledby="pet-dialog-title"
  >
    <DialogTitle id="pet-dialog-title">Pet Edit</DialogTitle>
    <DialogContent className={classes.dialog}>
      <div>
        <Typography
          className={classes.headline}
          variant="headline"
          color="inherit"
        >
          New Visit
        </Typography>
        <Paper className={classes.paper}>
          <form className={classes.form}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="vets">Vets</InputLabel>
              <Select
                inputProps={{
                  name: 'vets'
                }}
                onChange={handleUpdateSelectedVet}
                value={selectedVet}
              >
                {visitDetails.vets.map(vet => (
                  <MenuItem key={vet.id} value={`${vet.id}`}>
                    {`${vet.firstName} ${vet.lastName}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="date"
                label="Date"
                type="date"
                value={selectedDate}
                inputProps={{ min: getToday() }}
                onChange={handleUpdateSelectedDate}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="times">Times</InputLabel>
              <Select
                disabled
                inputProps={{
                  name: 'times'
                }}
                value={selectedTimeSlot}
                onChange={handleUpdateSelectedTimeSlot}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <Button color="primary" variant="contained">
                Save
              </Button>
            </FormControl>
          </form>
        </Paper>
        <Typography
          className={classes.headline}
          variant="headline"
          color="inherit"
        >
          Visits
        </Typography>
        <Paper className={classes.paper}>
          <List>
            {visitDetails.pet.visits.length > 0
              ? visitDetails.pet.visits.map(() => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <TodayIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Visit" />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              : 'No pending visits'}
          </List>
        </Paper>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

PetEditDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  handleUpdateSelectedVet: PropTypes.func.isRequired,
  handleUpdateSelectedDate: PropTypes.func.isRequired,
  handleUpdateSelectedTimeSlot: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
  selectedVet: PropTypes.string,
  selectedTimeSlot: PropTypes.string,
  visitDetails: PropTypes.object.isRequired
};

PetEditDialog.defaultProps = {
  selectedDate: null,
  selectedVet: null,
  selectedTimeSlot: null
};

export default withStyles(styles)(PetEditDialog);
