import { Navbar } from './components/Navbar/Navbar';

import './App.scss';
import { Pages } from './pages/Pages';

export const App = () => {
  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Pages />
        </div>
      </div>
    </div>
  );
};
