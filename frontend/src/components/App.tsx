import * as React from 'react';
import Menu from './Menu';

const NavBar = ({location, children}: {location?: any, children?: any}) => (
    <div>
        <Menu name={location.pathname} />
        <Main children={children} location={location}/>
    </div>
);

const Main = ({location, children}: {location?: any, children?: any}) => (
    <div>
        <div className='container-fluid'>
            <div className='container xd-container'>
                {children}
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
export default ({location, children}) => (
  <div>
      {location.pathname === '/login' ? <Main children={children} location={location}/> : <NavBar children={children} location={location} />}
  </div>
);
