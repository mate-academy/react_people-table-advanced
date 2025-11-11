import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PeopleTable } from '../components/PeopleTable/PeopleTable';
import { Errors } from '../types/enums/Errors';
import { groupPeopleParents } from '../utils/people';
import { PeopleFilters } from '../components/PeopleFilter/PeopleFilter';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { useDebounce } from '@uidotdev/usehooks';

type SortersCollback = (personA: Person, personB: Person) => number;
interface SortParams {
  sort: string | null;
  order?: string | null;
}

const SORTERS: Record<string, SortersCollback> = {
  name: (personA: Person, personB: Person) => {
    return personA.name.localeCompare(personB.name);
  },
  sex: (personA: Person, personB: Person) => {
    return personA.sex.localeCompare(personB.sex);
  },
  born: (personA: Person, personB: Person) => {
    return personA.born - personB.born;
  },
  died: (personA: Person, personB: Person) => {
    return personA.died - personB.died;
  },
};

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [localSearch, setLocalSearch] = useState<Person['name']>(
    searchParams.get('query') || '',
  );
  const debouncedSearch = useDebounce(localSearch, 300);
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const setSearchWith = useCallback(
    (params: SearchParams) => {
      const search = getSearchWith(searchParams, params);

      setSearchParams(search);
    },
    [searchParams, setSearchParams],
  );

  const handleResetFilters = () => {
    setSearchWith({
      centuries: null,
      sex: null,
      query: null,
    });

    setLocalSearch('');
  };

  useEffect(() => {
    setSearchWith({ query: debouncedSearch || null });
  }, [debouncedSearch, setSearchWith]);

  useEffect(() => {
    if (errorMessage) {
      const timerId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [errorMessage]);

  useEffect(() => {
    getPeople()
      .then(fetchedPeople => {
        setPeople(fetchedPeople);
      })
      .catch(() => {
        setErrorMessage(Errors.General);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const prepareSortParams = (field: string): SortParams => {
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

  const groupedPeople = groupPeopleParents(people);

  const filteredPeople = useMemo(() => {
    let filtered = [...groupedPeople];

    if (debouncedSearch.length > 0) {
      const normalized = debouncedSearch.toLowerCase().trim();

      filtered = filtered.filter(
        person =>
          person.name.toLowerCase().includes(normalized) ||
          person.motherName?.toLowerCase().includes(normalized) ||
          person.fatherName?.toLowerCase().includes(normalized),
      );
    }

    if (sex) {
      filtered = filtered.filter(person => person.sex === sex);
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(person =>
        centuries.includes(Math.ceil(person.born / 100)),
      );
    }

    if (sort) {
      const sorter = SORTERS[sort];
      const sorted = [...filtered].sort(sorter);

      filtered = order === 'desc' ? sorted.toReversed() : sorted;
    }

    return filtered;
  }, [debouncedSearch, sex, centuries, groupedPeople, sort, order]);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && (
              <PeopleFilters
                searchParams={searchParams}
                localSearch={localSearch}
                onChangeLocalSearch={setLocalSearch}
                onResetFilters={handleResetFilters}
              />
            )}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading ? (
                <Loader />
              ) : people.length > 0 ? (
                <PeopleTable
                  people={filteredPeople}
                  searchParams={searchParams}
                  getSortLinkProps={prepareSortParams}
                  sort={sort}
                  order={order}
                />
              ) : (
                <p data-cy="noPeopleMessage">{Errors.EmptyPeople}</p>
              )}

              {errorMessage.length > 0 && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {Errors.General}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
