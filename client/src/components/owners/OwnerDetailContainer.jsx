import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { fetchOwner } from '../../state/modules/owner';
import OwnerDetail from './OwnerDetail';

class OwnerDetailContainer extends React.Component {
  state = {
    isDialogOpen: false,
    selectedPet: undefined
  };

  componentDidMount() {
    const { fetchOwnerById, match } = this.props;
    fetchOwnerById(match.params.id);
  }

  handleCloseDialog = () => {
    this.setState({ isDialogOpen: false });
  };

  handleOpenDialog = id => () => {
    this.setState({ isDialogOpen: true, selectedPet: id });
  };

  render() {
    const {
      props: { owner },
      state: { isDialogOpen, selectedPet }
    } = this;

    return !owner ? (
      <div />
    ) : (
      <OwnerDetail
        owner={owner}
        isDialogOpen={isDialogOpen}
        handleCloseDialog={this.handleCloseDialog}
        handleOpenDialog={this.handleOpenDialog}
        selectedPetId={selectedPet}
      />
    );
  }
}

OwnerDetailContainer.propTypes = {
  match: PropTypes.object.isRequired,
  fetchOwnerById: PropTypes.func.isRequired,
  owner: PropTypes.object
};

OwnerDetailContainer.defaultProps = {
  owner: null
};

const mapStateToProps = state => ({ owner: state.owner.selectedOwner });

const mapDispatchToProps = {
  fetchOwnerById: fetchOwner
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnerDetailContainer);
export { ConnectedComponent as default };
