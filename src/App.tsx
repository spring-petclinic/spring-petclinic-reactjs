import * as React from 'react';
import { Menu } from './navigation';
import { useLocation } from 'react-router-dom';

export default function App() {
  const location = useLocation();

  return (
    <div>
      <Menu name={location.pathname} />
      <div className="container-fluid">
        <div className="container xd-container">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <img
                  src="/images/spring-pivotal-logo.png"
                  alt="Sponsored by Pivotal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
