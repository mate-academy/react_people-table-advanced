import './App.scss';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PeopleProvider } from './store/PeopleContext';

export const App = () => (
  <PeopleProvider>
    <div data-cy="app">
      <Navbar />

      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  </PeopleProvider>
);
