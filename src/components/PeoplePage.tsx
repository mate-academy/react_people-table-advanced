import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Filter, Person, SortField } from '../types';
import { PeopleTable } from './PeopleTable';
import { PeopleFilters } from './PeopleFilters';
import { filterPeople } from '../utils/filterPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const sex = searchParams.get(Filter.SEX) || '';
  const query = searchParams.get(Filter.QUERY) || '';
  const centuries = searchParams.getAll(Filter.CENTURIES) || [];
  const sortField = searchParams.get('sort') as SortField || SortField.ALL;
  const sortOrder = searchParams.get('order') || '';

  const fetchPeopleFromServer = async () => {
    setIsError(false);
    setLoading(true);

    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPeopleFromServer();
  }, []);

  const visiblePeople = useMemo(() => filterPeople(people, {
    sex,
    query,
    centuries,
    sortField,
    sortOrder,
  }), [people, query, centuries, sortField, sortOrder]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {people.length !== 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!people.length && !loading && !isError && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {visiblePeople.length !== 0 && (
                <PeopleTable
                  people={visiblePeople}
                  isError={isError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
