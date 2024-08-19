import { IApiOwner } from "@models/api/IApiOwner";

export function getOwnerFullName({ firstName, lastName }: IApiOwner): string {
  return firstName + " " + lastName;
}
