import { IApiOwner } from "@models/api/IApiOwner";

export function formatOwnerFullName({ firstName, lastName }: IApiOwner): string {
  return firstName + " " + lastName;
}
