import axios from 'axios';

class PetService {
  private url: string = 'http://localhost:9966/petclinic/api';

  findAllPets = (): Promise<any> => {
    return axios.get(this.url + '/pets')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  };

  findAllVets = (): Promise<any> => {
    return axios.get(this.url + '/vets')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  };

  findAllOwners = (): Promise<any> => {
    return axios.get(this.url + '/owners')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
      });
  };

  addOwner = (requestBody: FormData): Promise<any> => {
    return axios.post(this.url + '/owners', requestBody);
  };


  findAllPetTypes = (): Promise<any> => {
    return fetch(this.url + '/pettypes')
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };
}

export default PetService;
