import { Navbar } from './components/Navbar';
import { PeoplePage } from './components/PeoplePage';
import { getPeople } from './api';
import type { Person } from './types/Person';

import './App.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

const preparePeople = (people: Person[]): Person[] => {
  const personMap = new Map<string, Person>();

  people.forEach(person => personMap.set(person.name, person));

  return people.map(person => {
    const mother = person.motherName
      ? personMap.get(person.motherName)
      : undefined;
    const father = person.fatherName
      ? personMap.get(person.fatherName)
      : undefined;

    return {
      ...person,
      ...(mother && { mother }),
      ...(father && { father }),
    };
  });
};

export const App = () => {
  const getPreparedPeople = (): Promise<Person[]> => {
    return getPeople().then((items: Person[]) => {
      return preparePeople(items);
    });
  };

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/people">
              <Route
                index
                element={<PeoplePage onLoad={getPreparedPeople} />}
              />
              <Route
                path=":slug"
                element={<PeoplePage onLoad={getPreparedPeople} />}
              />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
