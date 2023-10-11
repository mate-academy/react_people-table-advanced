import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';

import './App.scss';
import { getPeople } from './api';
import { Person } from './types';
import { Root } from './Root';

export const App = () => {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(setPeople);
  }, []);

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Root people={people} setPeople={setPeople} />
        </div>
      </div>
    </div>
  );
};
