import { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

export const PeoplePage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setError(null);
      })
      .catch(() => {
        setError('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const sortField = searchParams.get('sort') as keyof Person | undefined;
  const sortOrder = searchParams.get('order') as 'asc' | 'desc' | undefined;

  const filteredPeople = useMemo(() => {
    let result = [...people];

    // Фільтрація за query
    if (query) {
      result = result.filter(
        person =>
          person.name.toLowerCase().includes(query) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(query)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query)),
      );
    }

    // Фільтрація за століттями
    if (selectedCenturies.length > 0) {
      result = result.filter(person => {
        const birthCentury = Math.ceil(person.born / 100);
        const deathCentury = Math.ceil(person.died / 100);

        return (
          selectedCenturies.includes(birthCentury) ||
          selectedCenturies.includes(deathCentury)
        );
      });
    }

    // Сортування
    if (sortField && sortOrder) {
      result.sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return sortOrder === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortOrder === 'asc'
          ? (valueA as number) - (valueB as number)
          : (valueB as number) - (valueA as number);
      });
    }

    return result;
  }, [people, query, selectedCenturies, sortField, sortOrder]);

  const handleSort = (field: keyof Person) => {
    if (sortField !== field) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort: field,
        order: 'asc',
      });
    } else if (sortOrder === 'asc') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sort: field,
        order: 'desc',
      });
    } else {
      const params = Object.fromEntries(searchParams);

      delete params.sort;
      delete params.order;
      setSearchParams(params);
    }
  };

  const hasNoMatchingPeople =
    !isLoading && !error && filteredPeople.length === 0 && people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters people={people} />
            </div>
          )}
          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}
              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}
              {!isLoading && !error && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
              {hasNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}
              {!isLoading && !error && filteredPeople.length > 0 && (
                <PeopleTable
                  people={filteredPeople}
                  selectedSlug={slug}
                  onSort={handleSort}
                  sortField={sortField}
                  sortOrder={sortOrder}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
