import { GetOneParams } from "react-admin";

export interface GetOwnerPetByIdParams extends GetOneParams {
  meta: {
    petId: number;
  };
}
