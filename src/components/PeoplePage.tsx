import { useEffect, useState } from 'react';
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

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // 1. Фільтрація за пошуковим запитом (query)
  let visiblePeople = people.filter(person => {
    if (!query) {
      return true;
    }

    const normalizedQuery = query.toLowerCase();

    return (
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery)
    );
  });

  // 2. Фільтрація за століттями (centuries)
  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  // 3. Сортування (sort & order)
  if (sort) {
    visiblePeople.sort((a, b) => {
      const valA = a[sort as keyof Person] ?? '';
      const valB = b[sort as keyof Person] ?? '';

      let result = 0;

      if (typeof valA === 'string' && typeof valB === 'string') {
        result = valA.localeCompare(valB);
      } else if (typeof valA === 'number' && typeof valB === 'number') {
        result = valA - valB;
      }

      return order === 'desc' ? -result : result;
    });
  }

  const showNoPeopleOnServer = !isLoading && !isError && people.length === 0;
  const showNoMatchingPeople =
    !isLoading && !isError && people.length > 0 && visiblePeople.length === 0;
  const showTable = !isLoading && !isError && visiblePeople.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {/* Сайдбар відображається лише після завантаження даних та за відсутності помилки */}
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
