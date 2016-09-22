import * as React from 'react';

import { Link } from 'react-router';
import { IOwner } from '../../types';
import { url } from '../../util';

interface IOwnersPageProps {
  params?: { ownerId?: string };
}

interface IOwnerPageState {
  owner?: IOwner;
}

export default class OwnersPage extends React.Component<IOwnersPageProps, IOwnerPageState> {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    const { params } = this.props;

    console.log('oara', params);

    if (params && params.ownerId) {
      const fetchUrl = url(`/api/owner/${params.ownerId}`);
      console.log('fetchUrl', fetchUrl);
      fetch(fetchUrl)
        .then(response => response.json())
        .then(owner => this.setState({ owner }));
    }
  }

  render() {
    const { owner } = this.state;

    if (!owner) {
      return <h2>No Owner loaded</h2>;
    }

    return (<div>
      <h2>Owner Information</h2>


      <table className='table table-striped'>
        <tbody>
          <tr>
            <th>Name</th>
            <td><b>{owner.firstName} {owner.lastName}'</b></td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{owner.address}</td>
          </tr>
          <tr>
            <th>City</th>
            <td>{owner.city}</td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>{owner.telephone}</td>
          </tr>
        </tbody>
      </table>

      <a href={url(`/owner/${owner.id}/edit`)} className='btn btn-default'>Edit Owner</a>
      &nbsp;
      <a href={url(`/owner/${owner.id}/pets/new`)} className='btn btn-default'>Add New Pet</a>

      <br />
      <br />
      <br />
      <h2>Pets and Visits</h2>

      <table className='table table-striped'>
        <tbody>
          {owner.pets.map(pet => (
            <tr key={pet.id}>
              <td style={{ 'verticalAlign': 'top' }}>
                <dl className='dl-horizontal'>
                  <dt>Name</dt>
                  <dd>{pet.name}</dd>
                  <dt>Birth Date</dt>
                  <dd>{pet.birthDate}</dd>
                  <dt>Type</dt>
                  <dd>{pet.type.name}</dd>
                </dl>
              </td>
              <td style={{ 'verticalAlign': 'top' }}>
                <table className='table-condensed'>
                  <thead>
                    <tr>
                      <th>Visit Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pet.visits.map(visit => (
                      <tr key={visit.id}>
                        <td>{visit.date}</td>
                        <td>{visit.description}</td>
                      </tr>
                    ))}

                    <tr>
                      <td>
                        <Link to={`/owners/${owner.id}/pets/${pet.id}/edit`}>Edit Pet</Link>
                      </td>
                      <td>
                        <Link to={`/owners/${owner.id}/pets/${pet.id}/visits/new`}>Add Visit</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
  }
}