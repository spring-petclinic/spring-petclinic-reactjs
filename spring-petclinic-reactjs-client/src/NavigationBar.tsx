import { useState } from "react";
import { Link } from "react-router-dom";
import { DASHBOARD, OWNERS, VETERINARIANS } from "@constants/routes";

export enum ENavBar {
  HOME,
  OWNERS,
  VETS,
  ERROR
}

export default function NavigationBar() {
  const [activePage, setActivePage] = useState<ENavBar>(ENavBar.HOME);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" role="navigation">
      <div className="container-fluid">
        <Link className="navbar-brand" to={DASHBOARD} onClick={() => setActivePage(ENavBar.HOME)}>
          <span />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === ENavBar.HOME ? "active" : ""}`}
                onClick={() => setActivePage(ENavBar.HOME)}
                to={DASHBOARD}
                title="home page"
              >
                <span className="fa fa-home" /> <span>Home</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === ENavBar.OWNERS ? "active" : ""}`}
                onClick={() => setActivePage(ENavBar.OWNERS)}
                to={OWNERS}
                title="find owners"
              >
                <span className="fa fa-search" /> <span>Find owners</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === ENavBar.VETS ? "active" : ""}`}
                onClick={() => setActivePage(ENavBar.VETS)}
                to={VETERINARIANS}
                title="veterinarians"
              >
                <span className="fa fa-th-list" /> <span>Veterinarians</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${activePage === ENavBar.ERROR ? "active" : ""}`}
                onClick={() => setActivePage(ENavBar.ERROR)}
                to="/oups"
                title="trigger a RuntimeException to see how it is handled"
              >
                <span className="fa exclamation-triangle" /> <span>Error</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
