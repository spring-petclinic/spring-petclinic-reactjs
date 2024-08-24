import { combineDataProviders } from "react-admin";
import { OWNERS, PET_TYPES } from "@constants/resources";
import ownersDataProvider from "./ownersDataProvider";
import petTypesDataProvider from "./petTypesDataProvider";

const dataProviders = combineDataProviders((resource) => {
  switch (resource) {
    case OWNERS:
      return ownersDataProvider;
    case PET_TYPES:
      return petTypesDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

export default dataProviders;
