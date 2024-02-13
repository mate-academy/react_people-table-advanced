import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { PeopleFilters } from '../../components/PeopleFilters';
import { PeopleTable } from '../../components/Table';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { getFilteredPeople } from '../../utils/getFilteredPeople';
import { getSortedPeople } from '../../utils/getSortedPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((response) => setPeople(response))
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = useMemo(() => {
    const filters = {
      sex: searchParams.get('sex'),
      name: searchParams.get('query'),
      centuries: searchParams.getAll('centuries'),
    };

    return getFilteredPeople(people, filters);
  }, [searchParams, people]);

  const sortedPeople = useMemo(() => {
    const column = searchParams.get('sort');
    const order = searchParams.get('order');

    return getSortedPeople(filteredPeople, column, order);
  }, [searchParams, filteredPeople]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {(!isLoading && !hasError) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {(hasError && !isLoading) && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading && !hasError) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!filteredPeople.length && !isLoading && !hasError) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {(!isLoading && !hasError && !!filteredPeople.length) && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
