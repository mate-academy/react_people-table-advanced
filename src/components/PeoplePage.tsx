import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visiblePeople = useMemo(() => {
    let filtered = [...people];
    const query = searchParams.get('query')?.toLowerCase();
    const centuries = searchParams.getAll('centuries');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');
    const sex = searchParams.get('sex');

    if (query) {
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.motherName?.toLowerCase().includes(query) ||
          p.fatherName?.toLowerCase().includes(query),
      );
    }

    if (centuries.length > 0) {
      filtered = filtered.filter(p => {
        const century = Math.ceil(p.born / 100).toString();

        return centuries.includes(century);
      });
    }

    if (sex) {
      filtered = filtered.filter(p => p.sex === sex);
    }

    if (sort) {
      filtered.sort((a, b) => {
        const valA = a[sort as keyof Person];
        const valB = b[sort as keyof Person];

        if (sort === 'born' || sort === 'died') {
          const numA = Number(valA);
          const numB = Number(valB);

          return order === 'desc' ? numB - numA : numA - numB;
        }

        const cleanA = (valA ?? '').toString().toLowerCase();
        const cleanB = (valB ?? '').toString().toLowerCase();

        if (cleanA < cleanB) {
          return order === 'desc' ? 1 : -1;
        }

        if (cleanA > cleanB) {
          return order === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filtered;
  }, [people, searchParams]);

  const isNoMatch =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {!isLoading && !hasError && people.length > 0 && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {isNoMatch && (
                <p>There are no people matching the current search criteria</p>
              )}

              {!isLoading && !hasError && (
                <PeopleTable allPeople={people} people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
