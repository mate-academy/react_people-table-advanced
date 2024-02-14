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
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then((res) => setPeople(res))
      .catch(() => setIsError(true))
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
          {(!isLoading && !isError) && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {(isError && !isLoading) && (
                <p data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {(!people.length && !isLoading && !isError) && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {(!filteredPeople.length && !isLoading && !isError) && (
                <p>There are no people matching the current search criteria</p>
              )}

              {(!isLoading && !isError && !!filteredPeople.length) && (
                <PeopleTable people={sortedPeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
