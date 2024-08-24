import { DataProvider, GetOneResult } from "react-admin";
import { CreateOrEditOwnerPetData } from "@models/api/CreateOrEditOwnerPetData.ts";
import { GetOwnerPetByIdParams } from "@models/api/GetOwnerPetByIdParams.ts";
import { IApiPet } from "@models/api/IApiPet";

export interface OwnersDataProvider extends DataProvider {
  createPet: (resource: string, params: CreateOrEditOwnerPetData) => Promise<GetOneResult<IApiPet>>;
  getPet: (resource: string, params: GetOwnerPetByIdParams) => Promise<GetOneResult<IApiPet>>;
  editPet: (resource: string, params: CreateOrEditOwnerPetData) => Promise<GetOneResult<IApiPet>>;
}
