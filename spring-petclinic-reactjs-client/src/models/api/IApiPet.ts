import { IApiPetType } from "@models/api/IApiPetType";

export interface IApiPet {
  id: number;
  ownerId: number;
  name: string;
  birthDate: string;
  visits: [];
  type: IApiPetType;
}
