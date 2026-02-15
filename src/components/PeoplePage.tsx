import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useParams, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { getPeople } from '../api';

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const centuries = searchParams.getAll('centuries');

  const { slug: selectedSlug } = useParams<{ slug: string }>();

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getPeople()
      .then(data => {
        setPeople(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function updateSort(field: SortField) {
    if (sort !== field) {
      setSearchParams(
        getSearchWith(searchParams, {
          sort: field,
          order: null,
        }),
      );

      return;
    }

    if (order !== 'desc') {
      setSearchParams(
        getSearchWith(searchParams, {
          sort: field,
          order: 'desc',
        }),
      );

      return;
    }

    setSearchParams(
      getSearchWith(searchParams, {
        sort: null,
        order: null,
      }),
    );
  }

  let peopleAfterNameFilter = people;

  if (query) {
    const normalizedQuery = query.toLowerCase();

    peopleAfterNameFilter = people.filter(person => {
      const names = [person.name, person.motherName, person.fatherName];

      return names.some(name => {
        if (!name) {
          return false;
        }

        return name.toLowerCase().includes(normalizedQuery);
      });
    });
  }

  const peopleAfterSexFilter = sex
    ? peopleAfterNameFilter.filter(person => person.sex === sex)
    : peopleAfterNameFilter;

  let peopleAfterCenturyFilter = peopleAfterSexFilter;

  if (centuries.length > 0) {
    peopleAfterCenturyFilter = peopleAfterSexFilter.filter(person => {
      const century = Math.floor((person.born - 1) / 100) + 1;

      return centuries.includes(String(century));
    });
  }

  const peopleAfterSort = [...peopleAfterCenturyFilter].sort((a, b) => {
    if (!sort) {
      return 0;
    }

    const fieldA = a[sort as keyof Person];
    const fieldB = b[sort as keyof Person];

    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return order === 'desc'
        ? fieldB.localeCompare(fieldA)
        : fieldA.localeCompare(fieldB);
    }

    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return order === 'desc' ? fieldB - fieldA : fieldA - fieldB;
    }

    return 0;
  });

  const hasFilters = query !== '' || sex !== null || centuries.length > 0;

  const noMatches =
    people.length > 0 && hasFilters && peopleAfterSort.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !error && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && noMatches && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !error && people.length > 0 && (
                <PeopleTable
                  updateSort={updateSort}
                  people={peopleAfterSort}
                  selectedSlug={selectedSlug}
                  allPeople={people}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
