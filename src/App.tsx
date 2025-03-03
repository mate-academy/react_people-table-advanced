import { Navbar } from './components/Navbar';

import './App.scss';
import { Outlet } from 'react-router-dom';

export const App = () => {
  // const { pathname, search } = useLocation();

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        {/* <p className="title is-5 has-text-info">{pathname}</p> */}

        {/* <p className="title is-6">{search && search.replaceAll('&', ' &')}</p> */}
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
