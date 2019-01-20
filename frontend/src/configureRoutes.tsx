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
import * as Cookies from 'es-cookie';

function isLoggedIn() {
    return Cookies.get('user');
}

function checkAuth(nextState, replace) {
    if (!isLoggedIn()) {
        replace({
            pathname: '/login'
        });
    }
}

export default () => (
  <Route component={App}>
    <Route path='/' component={WelcomePage} onEnter={checkAuth}/>
    <Route path='/owners/list' component={FindOwnersPage} onEnter={checkAuth}/>
    <Route path='/owners/new' component={NewOwnerPage} onEnter={checkAuth}/>
    <Route path='/owners/:ownerId/edit' component={EditOwnerPage} onEnter={checkAuth}/>
    <Route path='/owners/:ownerId/pets/:petId/edit' component={EditPetPage} onEnter={checkAuth}/>
    <Route path='/owners/:ownerId/pets/new' component={NewPetPage} onEnter={checkAuth}/>
    <Route path='/owners/:ownerId/pets/:petId/visits/new' component={VisitsPage} onEnter={checkAuth}/>
    <Route path='/owners/:ownerId' component={OwnersPage} onEnter={checkAuth}/>
    <Route path='/vets' component={VetsPage} onEnter={checkAuth}/>
    <Route path='/login' component={Login}/>
    <Route path='*' component={NotFoundPage} />
  </Route>
);

