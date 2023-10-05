import './App.scss';
import { Navigation } from './featurs/Navigation';

export const App = () => {
  return (
    <>
      <div data-cy="app">
        <Navigation />
      </div>
    </>
  );
};
