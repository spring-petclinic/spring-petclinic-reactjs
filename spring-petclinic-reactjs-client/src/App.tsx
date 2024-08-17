import { Admin as ReactAdminRoot, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import { Layout } from "./Layout";
import { dataProvider } from "./providers/dataProvider";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import OwnersPage from "./pages/owners";
import VetsPage from "./pages/Vets";
import OwnersListPage from "./pages/owners/OwnersList";
import OwnerForm from "./pages/owners/OwnerForm";

export const App = () => (
  <ReactAdminRoot dashboard={Dashboard} layout={Layout} error={Error} dataProvider={dataProvider}>
    <CustomRoutes>
      <Route path="/owners" element={<OwnersPage />} />
      <Route path="/owners/find" element={<OwnersListPage />} />
      <Route path="/owners/:id" element={<OwnerForm />} />

      <Route path="/vets" element={<VetsPage />} />
      <Route path="*" element={<Error />} />
    </CustomRoutes>
  </ReactAdminRoot>
);
