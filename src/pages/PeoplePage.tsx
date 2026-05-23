import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let result = [...people];
    const query = (searchParams.get('query') || '').toLowerCase();
    const centuries = searchParams.getAll('centuries');
    const sex = searchParams.get('sex');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    if (query) {
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (sex) {
      result = result.filter(p => p.sex === sex);
    }

    if (centuries.length > 0) {
      result = result.filter(p => {
        const bornCentury = Math.ceil(p.born / 100).toString();

        return centuries.includes(bornCentury);
      });
    }

    if (sort) {
      result.sort((a, b) => {
        const valueA = a[sort as keyof Person] || '';
        const valueB = b[sort as keyof Person] || '';

        let comparison = 0;

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          comparison = valueA.localeCompare(valueB);
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          comparison = valueA - valueB;
        }

        return order === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [people, searchParams]);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="columns">
        <div className="column">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {!isLoading && !isError && people.length === 0 && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {!isLoading && !isError && people.length > 0 && (
              <PeopleTable people={visiblePeople} allPeople={people} />
            )}
          </div>
        </div>

        <div className="column is-one-third is-one-quarter-widescreen">
          {!isLoading && !isError && people.length > 0 && <PeopleFilters />}
        </div>
      </div>
    </>
  );
};
