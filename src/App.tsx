import { Router } from './components/Router';
import { Navbar } from './components/Navbar';
import './App.scss';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Router />
        </div>
      </div>
    </div>
  );
};
