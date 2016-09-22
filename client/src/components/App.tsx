import * as React from 'react';
import { Link } from 'react-router';

const MenuItem = ({active, url, title, children}: { active: boolean, url: string, title: string, children?: any }) => (
  <li className={active ? 'active' : ''}>
    <a href={url} title={title}>{children}</a>
  </li>
);

const Menu = ({name}: { name: string }) => (
  <nav className='navbar navbar-default' role='navigation'>
    <div className='container'>
      <div className='navbar-header'>
        <a className='navbar-brand' href='/'><span></span></a>
        <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#main-navbar'>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
          <span className='icon-bar'></span>
        </button>
      </div>
      <div className='navbar-collapse collapse' id='main-navbar'>
        <ul className='nav navbar-nav navbar-right'>
          <MenuItem active={name === '/'} url='/' title='home page'>
            <span className='glyphicon glyphicon-home' aria-hidden='true'></span>&nbsp;
                    <span>Home</span>
          </MenuItem>

          <MenuItem active={name === 'owners'} url='/owners/find.html' title='find owners'>
            <span className='glyphicon glyphicon-search' aria-hidden='true'></span>&nbsp;
                    <span>Find owners</span>
          </MenuItem>

          <MenuItem active={name === 'vets'} url='/vets.html' title='veterinarians'>
            <span className='glyphicon glyphicon-th-list' aria-hidden='true'></span>&nbsp;
                    <span>Veterinarians</span>
          </MenuItem>

          <MenuItem active={name === 'oups'} url='/oups.html'
            title='trigger a RuntimeException to see how it is handled'>
            <span className='glyphicon glyphicon-warning-sign' aria-hidden='true'></span>&nbsp;
                    <span>Error</span>
          </MenuItem>
        </ul>
      </div>
    </div>
  </nav>
);


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
