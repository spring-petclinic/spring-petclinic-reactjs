import * as React from 'react';
import Menu from './Menu';

export default ({location, children}) => (
  <div>
    <Menu name={location.pathname} />
    <div className='container-fluid'>
      <div className='container xd-container'>

        {children}

        <br />
        <br />
        <div className='container'>
          <div className='row'>
            <div className='col-12 text-center'>
              <img src='/images/spring-pivotal-logo.png' alt='Sponsored by Pivotal' /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
