import { useEffect, useState } from 'react';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [errMess, setErrMess] = useState<boolean>(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  useEffect(() => {
    getPeople()
      .then((peoplefromServer => {
        setPeople(peoplefromServer);
        setFilteredPeople(peoplefromServer);
      }))
      .catch(() => {
        setErrMess(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people !== null && people.length > 0 && (
              <PeopleFilters
                people={people}
                onSetFilteredPeople={setFilteredPeople}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {people === null && errMess === false && (<Loader />)}
              {people !== null && filteredPeople.length > 0 && (
                <PeopleTable
                  people={people}
                  filteredPeople={filteredPeople}
                />
              )}

              {errMess && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {people !== null && people.length < 1 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {people !== null && filteredPeople.length < 1 && (
                <p>There are no people matching the current search criteria</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
