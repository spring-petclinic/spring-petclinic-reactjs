// React and Hot Loader
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { browserHistory as history } from 'react-router';

// styles
// import './styles/less/petclinic.less';

// The Application
import Root from './Root';

console.log('##################################################################################################');

// Render Application
const mountPoint = document.getElementById('mount');
ReactDOM.render(
  <AppContainer><Root history={history}/></AppContainer>,
  mountPoint
);

declare var module: any;
if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp history={history} />
      </AppContainer>,
      mountPoint
    );
  });
}
