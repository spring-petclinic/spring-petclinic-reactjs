import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import OwnersContainer, { OwnerDetailContainer } from './components/owners';
import Navbar from './components/common/Navbar';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={OwnersContainer} />
      <Route exact path="/owners" component={OwnersContainer} />
      <Route path="/owners/:id" component={OwnerDetailContainer} />
    </div>
  </Router>
);

export default App;
