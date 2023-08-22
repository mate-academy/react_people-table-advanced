import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
// import { HomePage } from './pages/HomePage';
// import { PageNotFound } from './pages/PageNotFound';
// import { PeoplePage } from './pages/PeoplePage';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
