import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Gender, SortType, Order } from '../types/FilterParams';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { peopleWithParents } from '../utils/peopleWithParents';
import { getFilteredPeople } from '../utils/getFilteredPeople';
import { getSearchWith } from '../utils/searchHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') as Gender;
  const sort = searchParams.get('sort') as SortType;
  const order = searchParams.get('order') as Order;

  useEffect(() => {
    getPeople()
      .then(data => setPeople(peopleWithParents(data)))
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const visiblePeople = useMemo(() => {
    return getFilteredPeople(people, {
      query,
      centuries,
      sex,
      sort,
      order,
    });
  }, [people, searchParams]);

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  };

  const handleSex = (newSex: string) => {
    setSearchParams(getSearchWith(searchParams, { newSex }));
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters
              query={query}
              centuries={centuries}
              sex={sex}
              handleQuery={handleQuery}
              handleSex={handleSex}
            />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading
                ? <Loader />
                : (
                  <>
                    {error && (
                      <p
                        data-cy="peopleLoadingError"
                        className="has-text-danger"
                      >
                        Something went wrong
                      </p>
                    )}

                    {people.length === 0 && !error && (
                      <p data-cy="noPeopleMessage">
                        There are no people on the server
                      </p>
                    )}

                    {people.length > 0 && !error && (
                      <PeopleTable people={visiblePeople} />
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
