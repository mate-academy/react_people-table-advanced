import './App.scss';
import { AppRouter } from './AppRouter';

export const App = () => {
  return (
    <div data-cy="app">
      <div className="section">
        <div className="container">
          <AppRouter />
        </div>
      </div>
    </div>
  );
};
