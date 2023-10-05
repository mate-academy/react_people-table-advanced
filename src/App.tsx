import { Navigation } from './components/Navigation';

import './App.scss';
import { MainRouter } from './components/MainRouter';

export const App = () => {
  return (
    <div data-cy="app">
      <Navigation />

      <div className="section">
        <MainRouter />
      </div>
    </div>
  );
};
