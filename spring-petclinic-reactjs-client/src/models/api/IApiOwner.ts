import { IApiPet } from "@models/api/IApiPet";

export interface IApiOwner {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  telephone: string;
  pets: IApiPet[];
}
