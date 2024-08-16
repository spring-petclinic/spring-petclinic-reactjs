import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="users" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="pets" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="owners" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="vets" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="visits" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="roles" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
    <Resource name="specialties" list={ListGuesser} edit={EditGuesser} show={ShowGuesser} />
  </Admin>
);
