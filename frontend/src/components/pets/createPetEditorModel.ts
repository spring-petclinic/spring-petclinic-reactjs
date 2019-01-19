import { IPetType, ISelectOption } from '../../types';
import { url, submitForm } from '../../util';

const toSelectOptions = (pettypes: IPetType[]): ISelectOption[] => pettypes.map(pettype => ({ value: pettype.id, name: pettype.name }));

export default (ownerId: string, petLoaderPromise: Promise<any>): Promise<any> => {
  return Promise.all(
    [fetch(url('/api/pettypes'))
      .then(response => response.json())
      .then(toSelectOptions),
    fetch(url('/api/owner/' + ownerId))
      .then(response => response.json()),
      petLoaderPromise,
    ]
  ).then(results => ({
    pettypes: results[0],
    owner: results[1],
    pet: results[2]
  }));
};
