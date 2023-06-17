import axios from 'axios';

  const URL:string = 'http://localhost:9966/petclinic/api';

  export function findAllPets(): Promise<any> {
    return axios.get(URL + '/pets')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  };

  export function findAllVets(): Promise<any> {
    return axios.get(URL + '/vets')
      .then((response) =>  response.data)
      .catch((error) => {
        console.error(error);
      });
  };

  export function findAllOwners(): Promise<any> {
    return axios.get(URL + '/owners')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  };

  export function addOwner(requestBody: FormData): Promise<any> {
    return axios.post(URL + '/owners', requestBody);
  };


  export function findAllPetTypes(): Promise<any> {
    return fetch(URL + '/pettypes')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };
