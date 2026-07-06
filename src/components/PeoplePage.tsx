import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useMemo, useState } from 'react';
import { getPeople } from '../api';
import { Person } from '../types';
import { useSearchParams } from 'react-router-dom';
import { SortField } from '../types/SortField';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, []);

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') ?? '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    } else {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (century === null) {
      params.delete('centuries');
      setSearchParams(params);

      return;
    }

    const newCentury = centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCentury.forEach(cent => params.append('centuries', cent));

    setSearchParams(params);
  };

  const visiblePeople = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    return people.filter(person => {
      if (sex && person.sex !== sex) {
        return false;
      }

      if (query) {
        const matches =
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery);

        if (!matches) {
          return false;
        }
      }

      if (centuries.length > 0) {
        const personCentury = Math.ceil(person.born / 100);

        if (!centuries.includes(String(personCentury))) {
          return false;
        }
      }

      return true;
    });
  }, [people, sex, query, centuries]);

  const resetAll = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    params.delete('query');
    params.delete('centuries');

    setSearchParams(params);
  };

  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      return {
        sort: field,
        order: null,
      };
    }

    if (sort === field && order !== 'desc') {
      return {
        sort: field,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  const sortedPeople = useMemo(() => {
    const sorted = [...visiblePeople];

    switch (sort) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'sex':
        sorted.sort((a, b) => a.sex.localeCompare(b.sex));
        break;

      case 'born':
        sorted.sort((a, b) => a.born - b.born);
        break;

      case 'died':
        sorted.sort((a, b) => a.died - b.died);
        break;
    }

    if (order === 'desc') {
      sorted.reverse();
    }

    return sorted;
  }, [visiblePeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>

      {isLoading && <Loader />}

      {hasError && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      )}

      {!isLoading && !hasError && people.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {!isLoading && !hasError && people.length > 0 && (
        <div className="block">
          <div className="columns is-desktop is-flex-direction-row-reverse">
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                sex={sex}
                query={query}
                handleQueryChange={handleQueryChange}
                centuries={centuries}
                toggleCentury={toggleCentury}
                resetAll={resetAll}
              />
            </div>

            {visiblePeople.length === 0 ? (
              <div className="column">
                <div className="box table-container">
                  <p data-cy="noPeopleMessage">
                    There are no people matching the current search criteria
                  </p>
                </div>
              </div>
            ) : (
              <div className="column">
                <div className="box table-container">
                  <PeopleTable
                    people={sortedPeople}
                    getSortParams={getSortParams}
                    sort={sort}
                    order={order}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
