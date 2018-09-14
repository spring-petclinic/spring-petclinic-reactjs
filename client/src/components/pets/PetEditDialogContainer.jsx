import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';

import { fetchPet, saveVisit } from '../../state/modules/pet';
import PetEditDialog from './PetEditDialog';
import getToday from '../../util/getToday';

const moment = require('moment');

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

  handleDeleteVisit = visitId => () => {
    const { fetchPetById, petId, ownerId } = this.props;

    const req = ajax.delete(`http://localhost:8080/api/visits/${visitId}`);

    req.subscribe(
      () => fetchPetById(ownerId, petId),
      catchError(error => console.log(error.xhr.response))
    );
  };

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

  handleSaveVisitForm = () => {
    const {
      props: { fetchPetById, petId, saveVisitForm, ownerId },
      state: {
        currentVisitDescription,
        selectedDate,
        selectedTimeSlot,
        selectedVet
      }
    } = this;

    const visit = {
      petId,
      description: currentVisitDescription,
      date: moment(selectedDate).format('YYYY/MM/DD'),
      time: selectedTimeSlot,
      vetId: selectedVet.id,
      ownerId
    };

    saveVisitForm(visit);
    fetchPetById(ownerId, petId);

    this.setState({
      selectedVet: undefined,
      selectedDate: getToday(),
      selectedTimeSlot: '',
      currentVisitDescription: ''
    });
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
        handleDeleteVisit={this.handleDeleteVisit}
        handleUpdateSelectedVet={this.handleUpdateSelectedVet}
        handleUpdateSelectedDate={this.handleUpdateSelectedDate}
        handleUpdateSelectedTimeSlot={this.handleUpdateSelectedTimeSlot}
        handleUpdateVisitDescription={this.handleUpdateVisitDescription}
        handleSaveVisitForm={this.handleSaveVisitForm}
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
  handleCloseDialog: PropTypes.func.isRequired,
  saveVisitForm: PropTypes.func.isRequired
};

PetEditDialogContainer.defaultProps = {
  visitDetails: undefined
};

const mapStateToProps = state => ({ visitDetails: state.pet.visitDetails });

const mapDispatchToProps = {
  fetchPetById: fetchPet,
  saveVisitForm: saveVisit
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(PetEditDialogContainer);
export { ConnectedComponent as default };
