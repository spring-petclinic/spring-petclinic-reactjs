import * as React from 'react';

import { IOwner, IPet } from '../../types';

export default ({owner, pet}: { owner: IOwner, pet: IPet }) => (
  <table className='table table-striped'>
    <thead>
      <tr>
        <th>Name</th>
        <th>Birth Date</th>
        <th>Type</th>
        <th>Owner</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{pet.name}</td>
        <td>{pet.birthDate}</td>
        <td>{pet.type.name}</td>
        <td>{owner.firstName} {owner.lastName}</td>
      </tr>
    </tbody>
  </table>
);