import { EOwnerForm } from "@models/enums/EOwnerForm";

export type OwnerFormSchema = {
  [EOwnerForm.FIRST_NAME]: string;
  [EOwnerForm.LAST_NAME]: string;
  [EOwnerForm.ADDRESS]: string;
  [EOwnerForm.CITY]: string;
  [EOwnerForm.TELEPHONE]: string;
};
