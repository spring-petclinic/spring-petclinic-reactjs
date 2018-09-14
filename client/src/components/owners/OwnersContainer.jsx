import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Owners from './Owners';
import { fetchOwners } from '../../state/modules/owner';

class OwnersContainer extends React.Component {
  state = { query: '' };

  componentDidMount() {
    const { fetchOwnersByLastName } = this.props;
    fetchOwnersByLastName('');
  }

  handleSearchOwners = () => {
    const {
      props: { fetchOwnersByLastName },
      state: { query }
    } = this;
    fetchOwnersByLastName(query);
  };

  handleUpdateQuery = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    const { owners } = this.props;
    return (
      <Owners
        handleSearchOwners={this.handleSearchOwners}
        handleUpdateQuery={this.handleUpdateQuery}
        owners={owners}
      />
    );
  }
}

OwnersContainer.propTypes = {
  owners: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchOwnersByLastName: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  owners: state.owner.results
});

const mapDispatchToProps = {
  fetchOwnersByLastName: fetchOwners
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnersContainer);

export { ConnectedComponent as default };
