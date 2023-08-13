import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { Loader } from '../../components/Loader';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types';
import { getPeople } from '../../api';
import { getPreparedPeople } from '../../utils/getPreparedPeople';
import { PeopleFilters } from '../../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(
    () => (getPreparedPeople(people, query, sex, centuries, sort, order)),
    [people, query, sex, centuries, sort, order],
  );
  const noPeopleData = !people.length && !error && !isLoading;
  const notMatchingSearch = !visiblePeople.length && !error && !isLoading;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {people.length > 0 && !error
              && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {noPeopleData && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {notMatchingSearch && (
                <p>
                  There are no people matching the current search criteria
                </p>
              )}

              {visiblePeople.length > 0 && !error
                && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
