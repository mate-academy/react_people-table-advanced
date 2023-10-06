import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/Navigation/Navigation';

function RootLayout() {
  return (
    <>
      <div data-cy="app">
        <MainNavigation />
        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
