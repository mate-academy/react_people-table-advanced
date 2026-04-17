/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getPeople } from '../api';

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const { slug: selectedSlug = '' } = useParams();

  const [people, setPeople] = useState<Person[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // 1. Отримуємо актуальні фільтри з URL
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setLoading(false));
  }, []);

  const filteredPeople = (people || []).filter(person => {
    // Пошук за ім'ям (або батьками)
    const matchesQuery = !query ||
      person.name.toLowerCase().includes(query) ||
      person.motherName?.toLowerCase().includes(query) ||
      person.fatherName?.toLowerCase().includes(query);

    // Стать
    const matchesSex = !sex || person.sex === sex;

    // Століття (1683 -> 17 століття)
    const personCentury = Math.ceil(person.born / 100).toString();
    // eslint-disable-next-line max-len
    const matchesCentury = centuries.length === 0 || centuries.includes(personCentury);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortField = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || 'asc';

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    const valueA = a[sortField as keyof Person] ?? '';
    const valueB = b[sortField as keyof Person] ?? '';

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return sortOrder === 'asc'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  return (
    <>
      <h1 className="title">People Page</h1>

      {loading && <Loader />}

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {/* 1. Помилка завантаження */}
              {!loading && isError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
                </p>
              )}

              {/* 2. На сервері взагалі немає людей (ПОТРІБНО ДОДАТИ data-cy) */}
              {!loading && !isError && people?.length === 0 && (
                <p data-cy="noPeopleMessage">There are no people on the server</p>
              )}

              {/* 3. Люди є, але фільтри все сховали */}
              {!loading && !isError && people && people.length > 0 && filteredPeople.length === 0 && (
                <p data-cy="noPeopleMessage">
      There are no people matching the current search criteria
                </p>
              )}

              {/* 4. Таблиця */}
              {!loading && !isError && filteredPeople.length > 0 && (
                <PeopleTable
                  people={sortedPeople}
                  selectedSlug={selectedSlug}
                  onSelect={() => {}}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
