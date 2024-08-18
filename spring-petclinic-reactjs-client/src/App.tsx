import { Admin as ReactAdminRoot, CustomRoutes } from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import { Layout } from "./Layout";
import dataProvider from "./providers/dataProvider";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import OwnersPage from "./pages/owners";
import VeterinariansPage from "./pages/Veterinarians";
import OwnersList from "./pages/owners/OwnersList";
import OwnerForm from "./pages/forms/OwnerForm";
import OwnerDetails from "./pages/owners/OwnerDetails";
import {
  OWNERS,
  OWNERS_ADD_NEW,
  OWNERS_FIND,
  GET_OWNER,
  PET_NEW_FORM,
  VETERINARIANS,
  EDIT_OWNER,
  PET_EDIT_FORM,
  PET_VISITS
} from "./constants/Routes";
import PetForm from "./pages/forms/PetForm";
import VisitsPage from "./pages/owners/Visits";

export const App = () => (
  <BrowserRouter>
    <ReactAdminRoot dashboard={Dashboard} layout={Layout} error={Error} dataProvider={dataProvider}>
      <CustomRoutes>
        <Route path={OWNERS} element={<OwnersPage />} />
        <Route path={OWNERS_FIND} element={<OwnersList />} />
        <Route path={GET_OWNER} element={<OwnerDetails />} />
        <Route path={OWNERS_ADD_NEW} element={<OwnerForm />} />
        <Route path={EDIT_OWNER} element={<OwnerForm />} />

        <Route path={PET_NEW_FORM} element={<PetForm />} />
        <Route path={PET_EDIT_FORM} element={<PetForm />} />
        <Route path={PET_VISITS} element={<VisitsPage />} />

        <Route path={VETERINARIANS} element={<VeterinariansPage />} />
        <Route path="*" element={<Error />} />
      </CustomRoutes>
    </ReactAdminRoot>
  </BrowserRouter>
);
