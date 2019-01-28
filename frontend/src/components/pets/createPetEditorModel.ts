import { IPetType, ISelectOption } from '../../types';
import { url, submitForm } from '../../util';
import * as Cookies from 'es-cookie';

const toSelectOptions = (pettypes: IPetType[]): ISelectOption[] => pettypes.map(pettype => ({ value: pettype.id, name: pettype.name }));
export default (ownerId: string, petLoaderPromise: Promise<any>): Promise<any> => {
    console.log(Cookies.getAll());
    const fetchParams = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('user')
        }
    };

    return Promise.all(
    [fetch(url('api/pettypes'), fetchParams)
      .then(response => response.json())
      .then(toSelectOptions),
    fetch(url('api/owners/' + ownerId), fetchParams)
      .then(response => response.json()),
      petLoaderPromise,
    ]
  ).then(results => ({
    pettypes: results[0],
    owner: results[1],
    pet: results[2]
  }));
};
