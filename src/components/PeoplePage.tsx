import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Отримання значення URL-параметрів
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // Мемоізована фільтрація та сортування
  const visiblePeople = useMemo(() => {
    let result = [...people];

    // 1. Фільтрація за Name / Mother / Father
    if (query) {
      const normalizedQuery = query.toLowerCase();

      result = result.filter(
        person =>
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery),
      );
    }

    // 2. Фільтрація за Sex
    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    // 3. Фільтрація за Centuries
    if (centuries.length > 0) {
      result = result.filter(person => {
        const century = Math.ceil(person.born / 100).toString();

        return centuries.includes(century);
      });
    }

    // 4. Сортування
    if (sort) {
      result.sort((a, b) => {
        const valA = a[sort as keyof Person] ?? '';
        const valB = b[sort as keyof Person] ?? '';

        let cmp = 0;

        if (typeof valA === 'string' && typeof valB === 'string') {
          cmp = valA.localeCompare(valB);
        } else if (typeof valA === 'number' && typeof valB === 'number') {
          cmp = valA - valB;
        }

        return order === 'desc' ? -cmp : cmp;
      });
    }

    return result;
  }, [people, query, sex, centuries, sort, order]);

  const showNoPeopleOnServer = !isLoading && !isError && people.length === 0;
  const showNoMatchingPeople =
    !isLoading && !isError && people.length > 0 && visiblePeople.length === 0;
  const showTable = !isLoading && !isError && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!isLoading && !isError && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p className="has-text-danger" data-cy="peopleLoadingError">
                  Something went wrong
                </p>
              )}

              {showNoPeopleOnServer && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {showNoMatchingPeople && (
                <p>There are no people matching the current search criteria</p>
              )}

              {showTable && <PeopleTable people={visiblePeople} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
