import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleFilters } from '../components/PeopleFilters';
import { PeopleTable, SortField } from '../components/PeopleTable';
import { Person } from '../types/Person';

const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

export const PeoplePage = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sortParam = searchParams.get('sort');

  const sortField = SORT_FIELDS.find(field => field === sortParam);

  const isDescending = searchParams.get('order') === 'desc';

  const updateParam = (key: string, value: string) => {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);

      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }

      return next;
    });
  };

  const updateCenturies = (centuries: string[]) => {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);

      next.delete('centuries');

      centuries.forEach(century => {
        next.append('centuries', century);
      });

      return next;
    });
  };

  const handleSort = (field: SortField) => {
    setSearchParams(previous => {
      const next = new URLSearchParams(previous);

      if (sortField !== field) {
        next.set('sort', field);
        next.delete('order');
      } else if (!isDescending) {
        next.set('order', 'desc');
      } else {
        next.delete('sort');
        next.delete('order');
      }

      return next;
    });
  };

  useEffect(() => {
    let isCancelled = false;

    getPeople()
      .then(data => {
        if (!isCancelled) {
          setPeople(data);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  const availableCenturies = Array.from(
    new Set(people.map(person => Math.ceil(person.born / 100))),
  ).sort((a, b) => a - b);

  const normalizedQuery = query.toLowerCase().trim();

  const visiblePeople = people
    .filter(person => {
      const matchesQuery = [
        person.name,
        person.motherName,
        person.fatherName,
      ].some(name => name?.toLowerCase().includes(normalizedQuery));

      const matchesCentury =
        selectedCenturies.length === 0 ||
        selectedCenturies.includes(String(Math.ceil(person.born / 100)));

      return matchesQuery && matchesCentury;
    })
    .sort((a, b) => {
      if (!sortField) {
        return 0;
      }

      const first = a[sortField];
      const second = b[sortField];

      const comparison =
        typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second));

      return isDescending ? -comparison : comparison;
    });

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        {!isLoading && !hasError && people.length > 0 && (
          <div className="column is-one-quarter">
            <PeopleFilters
              query={query}
              centuries={availableCenturies}
              selectedCenturies={selectedCenturies}
              onQueryChange={value => updateParam('query', value)}
              onCenturiesChange={updateCenturies}
            />
          </div>
        )}

        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {!isLoading && hasError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !hasError && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading &&
              !hasError &&
              people.length > 0 &&
              (visiblePeople.length > 0 ? (
                <PeopleTable
                  people={visiblePeople}
                  allPeople={people}
                  selectedSlug={slug}
                  sortField={sortField}
                  isDescending={isDescending}
                  onSort={handleSort}
                />
              ) : (
                <p data-cy="noSearchResults">
                  There are no people matching the current filters
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
