import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './App.scss';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';
import { getPeople } from './api';

import { HomePage } from './components/HomePage';
import { PeoplePage } from './components/PeoplePage';
import { Person } from './types/Person';
import { NotFoundPage } from './components/NotFoundPage';

library.add(fas);

type Status = { isActive: boolean };

const getActiveClasses = (status: Status) => classNames(
  { 'link--selected': status.isActive },
);

export const App = () => {
  const location = useLocation();
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then(peopleFromServer => {
        const preparedPeople = peopleFromServer.map(p => ({ ...p }));

        preparedPeople.forEach(person => {
          Object.assign(person, {
            mother: preparedPeople.find(m => m.name === person.motherName)
            || null,
            father: preparedPeople.find(f => f.name === person.fatherName)
            || null,
          });
        });

        setPeople(preparedPeople);
      });
  }, []);

  return (
    <div className="container box">
      <div className="App">
        <h1 className="title is-2">People table</h1>
      </div>

      <nav className="nav">
        <NavLink to="/" className={getActiveClasses}>
          <p className="link">Home page</p>
        </NavLink>

        <NavLink
          to={{
            pathname: 'people',
            search: location.search,
          }}
          className={getActiveClasses}
        >
          <p className="link">People page</p>
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people">
          <Route index element={<PeoplePage people={people} />} />
          <Route path=":slug" element={<PeoplePage people={people} />} />
        </Route>
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
