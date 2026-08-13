import './App.scss';
// import cn from 'classnames';
import { Outlet } from 'react-router-dom';
// import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';

export const App = () => {
  // const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  //   cn('navbar-item', { 'has-background-grey-lighter': isActive });
  // const { pathname, search } = useLocation();

  return (
    <div data-cy="app">
      <Navbar />
      {/* <br></br>
      <div className="section">
        <p className="title is-5 has-text-info">{pathname}</p>
        <p className="title is-6">{search && search.replace('&', ' &')}</p>
      </div> */}
      <main className="section">
        <Outlet />
      </main>
    </div>
  );
};
