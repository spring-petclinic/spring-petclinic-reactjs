import { Outlet } from 'react-router-dom';
import { Footer, Menu } from './navigation';

export default function App() {
  // TODO: add ErrorPage to Routes

  //const location = useLocation();

  return (
    <>
      <Menu name={'Pets'} />
      <Outlet />
      <Footer />
    </>
  );
}
