import * as React from 'react';

import { Link } from 'react-router';
import { IOwner } from '../../types';

export default ({owner}: { owner: IOwner }) => (
  <section>
    <h2>Owner Information</h2>

    <table id='owners-information-table' className='table table-striped'>
      <tbody>
        <tr>
          <th>Name</th>
          <td><b>{owner.firstName} {owner.lastName}</b></td>
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

    <Link to={`owners/${owner.id}/edit`} className='btn btn-default'>Edit Owner</Link>
    &nbsp;
    <Link id='add-new-pet-button' to={`/owners/${owner.id}/pets/new`} className='btn btn-default'>Add New Pet</Link>
  </section>
);
