import { IApiEnumItem } from "@models/api/IApiEnumItem.ts";

export interface IApiVeterinarian {
  id: number;
  firstName: string;
  lastName: string;
  specialties: IApiEnumItem[];
}
