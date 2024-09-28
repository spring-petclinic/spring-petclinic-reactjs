import { EPetForm } from "@models/enums/EPetForm";

export type PetFormSchema = {
  [EPetForm.NAME]: string;
  [EPetForm.BIRTH_DATE]: Date;
  [EPetForm.PET_TYPE]: number;
};
