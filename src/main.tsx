import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/less/petclinic.less';
import { VetList, OwnerList, Home, ErrorPage } from './components';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="/owners/" element={<OwnerList />} />
      <Route path="/vets" element={<VetList />} />
      <Route errorElement={<ErrorPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
