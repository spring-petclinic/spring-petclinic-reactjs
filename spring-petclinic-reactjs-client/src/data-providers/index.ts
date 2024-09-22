import { combineDataProviders } from "react-admin";
import { OWNERS, PET_TYPES, VETERINARIANS } from "@constants/resources";
import ownersDataProvider from "./ownersDataProvider";
import generalDataProvider from "./generalDataProvider.ts";

const dataProviders = combineDataProviders((resource) => {
  switch (resource) {
    case OWNERS:
      return ownersDataProvider;
    case VETERINARIANS:
    case PET_TYPES:
      return generalDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

export default dataProviders;
