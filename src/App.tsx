import './App.scss';
import { Navbar } from './components/Navbar';
import { MainAppProvider } from './context/AppContext';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <MainAppProvider>
      <div data-cy="app">
        <Navbar />

        <div className="section">
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </MainAppProvider>
  );
};
