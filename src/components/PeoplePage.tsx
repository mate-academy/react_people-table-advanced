import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import React, { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(people => setPeopleList(people))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const peopleToShow = useMemo(() => {
    const sex = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase().trim() || '';
    const centuries = searchParams.getAll('centuries');

    return peopleList.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const nameMatch = person.name.toLowerCase().includes(query);
        const motherMatch = person.motherName?.toLowerCase().includes(query);
        const fatherMatch = person.fatherName?.toLowerCase().includes(query);

        if (!nameMatch && !motherMatch && !fatherMatch) {
          return false;
        }
      }

      if (centuries.length > 0) {
        const personCentury = Math.ceil(person.born / 100).toString();

        if (!centuries.includes(personCentury)) {
          return false;
        }
      }

      return true;
    });
  }, [searchParams, peopleList]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && peopleList.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && peopleToShow.length === 0 && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && peopleToShow.length > 0 && (
                <PeopleTable people={peopleToShow} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
