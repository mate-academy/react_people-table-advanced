import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((peopleList) => setPeople(peopleList))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  let visiblePeople = [...people];

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople
      .filter(person => centuries
        .includes(Math.ceil(person.born / 100).toString()));
  }

  if (query) {
    visiblePeople = visiblePeople.filter(person => (
      person.name.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
    ));
  }

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(!isError && !isLoading && people.length) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && (
                <Loader />
              )}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {(!isLoading && people.length === 0) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {(visiblePeople.length === 0 && !isLoading) && (
                <p>There are no people matching the current search criteria</p>
              )}
              {(!isLoading && !isError && visiblePeople.length !== 0) && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
