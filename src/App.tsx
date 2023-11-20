import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <div data-cy="app">
      <Header />
      <main className="section">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
