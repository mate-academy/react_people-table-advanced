import { useState, useEffect } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PersonInfo } from './PersonInfo';
import { PeopleFilters } from './PeopleFilters';

export const People = () => {
  const [loadingDone, setLoadingDone] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        const newPeople = peopleFromServer.map(person => {
          const newPerson = { ...person };

          newPerson.mother = peopleFromServer
            .find(p => p.name === person.motherName);

          newPerson.father = peopleFromServer
            .find(p => p.name === person.fatherName);

          return newPerson;
        });

        setPeople(newPeople);
      })
      .catch(() => setErrorMessage('Something went wrong'))
      .finally(() => setLoadingDone(true));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loadingDone && <Loader />}
          <div className="column is-7-tablet is-narrow-desktop">
            {loadingDone && <PeopleFilters />}
          </div>
          <div className="box table-container">
            {errorMessage
            && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                {errorMessage}
              </p>
            )}
            {loadingDone && (people.length === 0 ? (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            ) : (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map(person => {
                    return (
                      <PersonInfo
                        person={person}
                        key={person.slug}
                      />
                    );
                  })}
                </tbody>
              </table>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
