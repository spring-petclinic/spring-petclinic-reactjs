import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchPet } from '../../state/modules/pet';
import PetEditDialog from './PetEditDialog';
import getToday from '../../util/getToday';

class PetEditDialogContainer extends React.Component {
  state = {
    isDialogOpen: false,
    selectedVet: '',
    selectedDate: getToday(),
    selectedTimeSlot: ''
  };

  componentDidMount() {
    const { fetchPetById, petId, ownerId } = this.props;
    fetchPetById(ownerId, petId);
  }

  handleUpdateSelectedVet = e => {
    this.setState({ selectedVet: e.target.value });
  };

  handleUpdateSelectedDate = e => {
    this.setState({ selectedDate: e.target.value });
  };

  handleUpdateSelectedTimeSlot = e => {
    this.setState({ selectedTimeSlot: e.target.value });
  };

  render() {
    const {
      props: { isDialogOpen, handleCloseDialog, visitDetails },
      state: { selectedDate, selectedTimeSlot, selectedVet }
    } = this;

    return visitDetails ? (
      <PetEditDialog
        isDialogOpen={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleUpdateSelectedVet={this.handleUpdateSelectedVet}
        handleUpdateSelectedDate={this.handleUpdateSelectedDate}
        handleUpdateSelectedTimeSlot={this.handleUpdateSelectedTimeSlot}
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
