import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { Outlet, useSearchParams } from 'react-router-dom';

export const PeoplePage = () => {
  const [peopleFromServer, setPeopleFromServer] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const centuries = searchParams.getAll('centuries');

  let filtredPeople = [...peopleFromServer];


  if (sex) {
    filtredPeople = filtredPeople.filter(person => person.sex === sex);
  }

  if (query) {
    filtredPeople = filtredPeople.filter(
      person =>
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query),
    );
  }

  if (centuries.length > 0) {
    filtredPeople = filtredPeople.filter(person =>
      centuries.includes(String(Math.ceil(person.born / 100))),
    );
  }

  useEffect(() => {
    getPeople()
      .then(people => {
        setPeopleFromServer(people);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const noMatchingPeople =
    !isLoading &&
    !hasError &&
    peopleFromServer.length > 0 &&
    filtredPeople.length === 0;
  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && peopleFromServer.length === 0 && !hasError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {noMatchingPeople && (
                <p data-cy="noMatchMessage">
                  There are no people matching the current search criteria
                </p>
              )}

              {!isLoading && !hasError && peopleFromServer.length > 0 && (
                <PeopleTable filtredPeople={filtredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};
