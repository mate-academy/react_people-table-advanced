// import { PeoplePage } from './components/PeoplePage/PeoplePage';
import { Navbar } from './components/Navbar/Navbar';

import './App.scss';
import { Navigate, Outlet, useParams } from 'react-router-dom';

export const App = () => {
  const { currentText } = useParams();

  if (currentText === 'home') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
