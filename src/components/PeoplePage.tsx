import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams<{ slug?: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  interface SortParams {
    sort: string | null;
    order?: string | null;
  }

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isNoPeople = people.length < 1;

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleClearFilters = () => {
    setSearchWith({
      centuries: null,
      sex: null,
      query: null,
    });
  };

  const toggleSortParams = (field: string): SortParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    if (order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field };
  };

  const filteredPeople = useMemo(() => {
    return people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (centuries.length > 0) {
        const birthYear = person.born;

        if (birthYear === null) {
          return false;
        }

        const century = String(Math.floor((birthYear - 1) / 100) + 1);

        if (!centuries.includes(century)) {
          return false;
        }
      }

      if (query) {
        const normalizedQuery = query.toLowerCase();

        const nameMatch = person.name.toLowerCase().includes(normalizedQuery);
        const motherNameMatch = (person.motherName || '')
          .toLowerCase()
          .includes(normalizedQuery);
        const fatherNameMatch = (person.fatherName || '')
          .toLowerCase()
          .includes(normalizedQuery);

        return nameMatch || motherNameMatch || fatherNameMatch;
      }

      return true;
    });
  }, [people, sex, centuries, query]);

  const visiblePeople = useMemo(() => {
    if (!sort) {
      return filteredPeople;
    }

    const sortedPeople = [...filteredPeople];

    const sortOrder = order === 'desc' ? -1 : 1;

    sortedPeople.sort((personA, personB) => {
      const valueA = personA[sort as keyof Person];
      const valueB = personB[sort as keyof Person];

      if (valueA === null && valueB === null) {
        return 0;
      }

      if (valueA === null) {
        return sortOrder;
      }

      if (valueB === null) {
        return -sortOrder;
      }

      if (sort === 'born' || sort === 'died') {
        return ((valueA as number) - (valueB as number)) * sortOrder;
      }

      return String(valueA).localeCompare(String(valueB)) * sortOrder;
    });

    return sortedPeople;
  }, [filteredPeople, sort, order]);

  const isNoMatches = filteredPeople.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                onClearFilters={handleClearFilters}
                setSearchWith={setSearchWith}
                query={query}
                centuries={centuries}
              />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !isError && isNoPeople && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && isNoMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !isError && visiblePeople.length > 0 && (
                <PeopleTable
                  people={visiblePeople}
                  slug={slug}
                  searchParams={searchParams}
                  toggleSortParams={toggleSortParams}
                  sort={sort}
                  order={order}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
