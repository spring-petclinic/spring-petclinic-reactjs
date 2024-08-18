export interface IApiOwner {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets: [
    {
      id: number;
      ownerId: number;
      name: string;
      birthDate: string;
      visits: [];
      type: {
        id: number;
        name: string;
      };
    }
  ];
}
