import { Menu } from './navigation';
import { useLocation } from 'react-router-dom';
import ErrorPage from './Error';
import VetList from './components/VetList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './Root';
import OwnerList from './components/OwnerList';

export default function App() {
  // TODO: add ErrorPage to Routes

  //const location = useLocation();

  return (
    <div>
      <Router>
        <Menu name={'Pets'} />
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/owners" element={<OwnerList />} />
          <Route path="/vets" element={<VetList />} />
        </Routes>
      </Router>
      <div className="container-fluid">
        <div className="container xd-container">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <img src="/images/spring-pivotal-logo.png" alt="Sponsored by Pivotal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
