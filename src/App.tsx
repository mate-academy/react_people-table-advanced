/*
import { PeoplePage } from './components/PeoplePage';
import { Navbar } from './components/Navbar';
*/

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
