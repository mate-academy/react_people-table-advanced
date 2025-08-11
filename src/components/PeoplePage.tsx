import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';
import { useSearchParams } from 'react-router-dom';
import {
  FilterBy,
  Order,
  QueryParam,
  SortBy,
  SortingOptions,
} from '../types/Order';
import { filterAndSortPeople } from '../function/filterAndSortPeople';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortField =
    (searchParams.get(SortingOptions.SortOptions) as SortBy) || '';
  const sortOrder =
    (searchParams.get(SortingOptions.OrderOptions) as Order) || '';

  const query = searchParams.get(QueryParam.SEARCH) || '';
  const centuries = searchParams.getAll(FilterBy.Centuries);
  const sex = searchParams.get(FilterBy.Sex) || null;

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const peopleUsed = filterAndSortPeople(
    people,
    query,
    centuries,
    sex,
    sortField,
    sortOrder,
  );

  const handleSort = (field: string) => {
    const currentSortField = searchParams.get(SortingOptions.SortOptions);
    const currentSortOrder = searchParams.get(SortingOptions.OrderOptions);
    const params = new URLSearchParams(searchParams);

    if (currentSortField === field) {
      if (currentSortOrder === Order.asc) {
        params.set(SortingOptions.OrderOptions, Order.desc);
      } else if (currentSortOrder === Order.desc) {
        params.delete(SortingOptions.SortOptions);
        params.delete(SortingOptions.OrderOptions);
      }
    } else {
      params.set(SortingOptions.SortOptions, field);
      params.set(SortingOptions.OrderOptions, Order.asc);
    }

    setSearchParams(params);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length >= 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                sex={sex}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {people.length <= 0 && !loading && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {!peopleUsed.length && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!loading && !error && peopleUsed.length > 0 && (
                <PeopleTable people={peopleUsed} onSort={handleSort} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
