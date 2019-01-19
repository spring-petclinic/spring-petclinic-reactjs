import * as React from 'react';
import {Route} from 'react-router';

import App from './components/App';

import WelcomePage from './components/WelcomePage';
import FindOwnersPage from './components/owners/FindOwnersPage';
import OwnersPage from './components/owners/OwnersPage';
import NewOwnerPage from './components/owners/NewOwnerPage';
import EditOwnerPage from './components/owners/EditOwnerPage';
import NewPetPage from './components/pets/NewPetPage';
import EditPetPage from './components/pets/EditPetPage';
import VisitsPage from './components/visits/VisitsPage';
import VetsPage from './components/vets/VetsPage';
import Login from './components/Login';
import NotFoundPage from './components/NotFoundPage';

function loggedIn() {
    return false;
}

function requireAuth(nextState, replace) {
    console.log('AUTH');
    if (!loggedIn()) {
        replace({
            pathname: '/login'
        });
    }
}

export default () => (
  <Route component={App}>
    <Route path='/' component={WelcomePage} />
    <Route path='/owners/list' component={FindOwnersPage} />
    <Route path='/owners/new' component={NewOwnerPage} />
    <Route path='/owners/:ownerId/edit' component={EditOwnerPage} />
    <Route path='/owners/:ownerId/pets/:petId/edit' component={EditPetPage} />
    <Route path='/owners/:ownerId/pets/new' component={NewPetPage} />
    <Route path='/owners/:ownerId/pets/:petId/visits/new' component={VisitsPage} />
    <Route path='/owners/:ownerId' component={OwnersPage} />
    <Route path='/vets' component={VetsPage} onEnter={requireAuth}/>
    <Route path='/login' component={Login}/>
    <Route path='*' component={NotFoundPage} />
  </Route>
);

