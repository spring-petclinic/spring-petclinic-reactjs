import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

import { fetchPet } from '../../state/modules/pet';
import PetEditDialog from './PetEditDialog';
import getToday from '../../util/getToday';

class PetEditDialogContainer extends React.Component {
  state = {
    isDialogOpen: false,
    selectedVet: undefined,
    selectedDate: getToday(),
    selectedTimeSlot: '',
    currentVisitDescription: ''
  };

  componentDidMount() {
    const { fetchPetById, petId, ownerId } = this.props;
    fetchPetById(ownerId, petId);
  }

  handleUpdateSelectedVet = e => {
    const req = ajax.getJSON(
      `http://localhost:8080/api/visits/list?vetId=${e.target.value}`
    );
    req.subscribe(
      visits =>
        this.setState({
          selectedVet: {
            id: e.target.value,
            timesBooked: visits.map(v => v.time)
          }
        }),

      catchError(error => console.log(error.xhr.response))
    );
  };

  handleUpdateSelectedDate = e => {
    this.setState({ selectedDate: e.target.value });
  };

  handleUpdateSelectedTimeSlot = e => {
    this.setState({ selectedTimeSlot: e.target.value });
  };

  handleUpdateVisitDescription = e => {
    this.setState({ currentVisitDescription: e.target.value });
  };

  render() {
    const {
      props: { isDialogOpen, handleCloseDialog, visitDetails },
      state: {
        currentVisitDescription,
        selectedDate,
        selectedTimeSlot,
        selectedVet
      }
    } = this;

    return visitDetails ? (
      <PetEditDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleUpdateSelectedVet={this.handleUpdateSelectedVet}
        handleUpdateSelectedDate={this.handleUpdateSelectedDate}
        handleUpdateSelectedTimeSlot={this.handleUpdateSelectedTimeSlot}
        handleUpdateVisitDescription={this.handleUpdateVisitDescription}
        currentVisitDescription={currentVisitDescription}
        selectedDate={selectedDate}
        selectedVet={selectedVet}
        selectedTimeSlot={selectedTimeSlot}
        visitDetails={visitDetails}
      />
    ) : null;
  }
}

PetEditDialogContainer.propTypes = {
  fetchPetById: PropTypes.func.isRequired,
  ownerId: PropTypes.number.isRequired,
  visitDetails: PropTypes.object,
  petId: PropTypes.number.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired
};

PetEditDialogContainer.defaultProps = {
  visitDetails: undefined
};

const mapStateToProps = state => ({ visitDetails: state.pet.visitDetails });

const mapDispatchToProps = {
  fetchPetById: fetchPet
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PetEditDialogContainer);
export { ConnectedComponent as default };
