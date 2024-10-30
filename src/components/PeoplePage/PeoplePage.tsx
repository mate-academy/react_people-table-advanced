import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getVisiblePeople } from '../../utils/getVisiblePeople';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';

import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { PeopleFilters } from '../PeopleFilters/PeopleFilters';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const activeSex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  const handleSexChange = (value: string | null) => {
    setSearchWith({ sex: value || null });
  };

  const getCenturiesParams = (selectedCentury: string) =>
    centuries.includes(selectedCentury)
      ? centuries.filter(century => century !== selectedCentury)
      : [...centuries, selectedCentury];

  const visiblePeople = getVisiblePeople(people, searchParams);
  const isPeopleListEmpty = people.length === 0 && !loading && !error;

  useEffect(() => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setPeople([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!loading && (
              <PeopleFilters
                activeSex={activeSex}
                query={query}
                centuries={centuries}
                onQueryChange={handleQueryChange}
                onSexChange={handleSexChange}
                getCenturiesParams={getCenturiesParams}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {isPeopleListEmpty && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {visiblePeople.length === 0 && !loading ? (
                <p>There are no people matching the current search criteria</p>
              ) : (
                !loading && (
                  <PeopleTable
                    people={visiblePeople}
                    sort={sort}
                    order={order}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
