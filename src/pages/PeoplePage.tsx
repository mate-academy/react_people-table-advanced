import React, { useEffect, useState } from 'react';
import { PeopleFilters } from '../components/PeopleFilters';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { transformPeople } from '../utils/peopleSorting';
import { PeopleTable } from '../components/PeopleTable';
import { useSearchParams } from 'react-router-dom';
import {
  filterByQuery,
  filterBySex,
  filterByCenturies,
} from '../utils/PeopleUtils';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => setError('Something went wrong'))
      .finally(() => setIsLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const peopleWithParents = transformPeople(people);

  const filteredByQuery = filterByQuery(peopleWithParents, query);
  const filteredBySex = filterBySex(filteredByQuery, selectedSex);
  const filteredPeople = filterByCenturies(filteredBySex, selectedCenturies);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!isLoading && !error && !filteredPeople.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable people={filteredPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
