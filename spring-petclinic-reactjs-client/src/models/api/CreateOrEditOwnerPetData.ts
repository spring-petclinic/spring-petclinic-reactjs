import { IApiEnumItem } from "@models/api/IApiEnumItem.ts";
import { PetFormSchema } from "@models/form/PetFormSchema";
import { EPetForm } from "@models/enums/EPetForm";
import { CreateParams } from "react-admin";

export interface CreateOrEditOwnerPetData extends CreateParams {
  meta: { ownerId: number };
  data: Omit<PetFormSchema, EPetForm.PET_TYPE> & { petId?: number; type: IApiEnumItem };
}
