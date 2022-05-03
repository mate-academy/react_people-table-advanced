import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Navigate,
} from 'react-router-dom';
import { getPeople } from './api/api';
import './App.scss';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

const App: React.FC = () => {
  const [people, setPeoples] = useState<People[]>([]);
  const [updatedPeople, setUpdatedPeople] = useState<UpdatedPersons[]>([]);

  const addParents = (persons: People[]) => {
    return persons.map((person) => {
      const father = persons.find(
        (child: People) => (child.fatherName === person.name),
      );

      const mother = persons.find(
        (child: People) => (child.motherName === person.name),
      );

      return {
        ...person,
        mother,
        father,
      };
    });
  };

  const onAdd = () => {
    getPeople()
      .then((persons) => {
        return setPeoples(persons);
      });
  };

  useEffect(() => {
    onAdd();
  }, []);

  useEffect(() => {
    if (people.length !== 0) {
      setUpdatedPeople(addParents(people));
    }
  }, [people]);

  return (
    <>
      <header>
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/people">People</NavLink>
        </nav>
      </header>

      <div className="App">
        <Routes>
          <Route
            path="/people"
            element={
              updatedPeople.length > 0
                ? (<PeopleTable people={updatedPeople} />)
                : <p>Please whait</p>
            }
          >
            <Route
              path=":personSlug"
              element={<PeopleTable people={updatedPeople} />}
            />
          </Route>
          <Route path="/" element={<h1>Home page</h1>} />
          <Route path="/home" element={<Navigate replace to="/" />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default App;
