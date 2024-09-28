import { IApiEnumItem } from "@models/api/IApiEnumItem.ts";

export interface IApiPet {
  id: number;
  ownerId: number;
  name: string;
  birthDate: string;
  visits: [];
  type: IApiEnumItem;
}
