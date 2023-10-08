import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';

import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';

import { getPeople } from '../api';
import { Person } from '../types';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople().then(setPeople).catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  useMemo(() => {
    setFilteredPeople(people.filter(person => person.name.toLowerCase()
      .includes(searchParams.get('query')?.toLowerCase() || '')
    || person.motherName?.toLowerCase().includes(searchParams
      .get('query')?.toLowerCase() || '')
    || person.fatherName?.toLowerCase().includes(searchParams
      .get('query')?.toLowerCase() || ''))
      .filter(person => (searchParams.get('sex')
        ? person.sex === searchParams.get('sex')
        : person.sex))
      .filter(person => (searchParams
        .getAll('century').length > 0
        ? searchParams
          .getAll('century').includes(Math.floor(person.born / 100).toString())
        : person)));
  }, [searchParams, people]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length > 0 && !isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              <>
                {error && !isLoading
              && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

                {people.length === 0 && !isLoading && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                {filteredPeople.length === 0
                && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              </>

              {people.length > 0 && <PeopleTable people={filteredPeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
