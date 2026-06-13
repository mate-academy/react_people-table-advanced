import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { getPeople } from '../api'; // Перевір шлях до api.ts

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Підключаємо хук для роботи з URL параметрами
  const [searchParams] = useSearchParams();

  // Завантаження даних
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // 1. Витягуємо всі параметри з URL
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');
  const sex = searchParams.get('sex'); // Додали витягування статі

  // 2. Застосовуємо фільтри та сортування до масиву
  let visiblePeople = [...people];

  // Фільтр за ім'ям (query)
  if (query) {
    const normalizedQuery = query.toLowerCase();

    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(normalizedQuery) ||
        (person.motherName?.toLowerCase() || '').includes(normalizedQuery) ||
        (person.fatherName?.toLowerCase() || '').includes(normalizedQuery),
    );
  }

  // Фільтр за століттями
  if (centuries.length > 0) {
    visiblePeople = visiblePeople.filter(person => {
      // Визначаємо століття: наприклад 1714 рік / 100 = 17.14 -> округлюємо вгору = 18 століття
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  // Фільтр за статтю (sex) - додано!
  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  // Сортування (з валідацією полів)
  const allowedSortFields = ['name', 'sex', 'born', 'died'];
  const isSortValid = sortField && allowedSortFields.includes(sortField);

  if (isSortValid) {
    visiblePeople.sort((a, b) => {
      const aValue = a[sortField as keyof Person] || '';
      const bValue = b[sortField as keyof Person] || '';

      if (aValue < bValue) {
        return order === 'desc' ? 1 : -1;
      }

      if (aValue > bValue) {
        return order === 'desc' ? -1 : 1;
      }

      return 0;
    });
  }

  // За умовою фільтри показуємо тільки коли дані успішно завантажені
  const showFilters = !isLoading && !hasError && people.length > 0;
  const noResults =
    !isLoading && !hasError && people.length > 0 && visiblePeople.length === 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            {showFilters && <PeopleFilters />}
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {!isLoading && hasError && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  Something went wrong
                </p>
              )}

              {!isLoading && !hasError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {/* Нове повідомлення, якщо після фільтрації масив порожній */}
              {noResults && (
                <p>There are no people matching the current search criteria</p>
              )}

              {/* Передаємо у таблицю вже ВІДФІЛЬТРОВАНИХ та ВІДСОРТОВАНИХ людей */}
              {!isLoading && !hasError && visiblePeople.length > 0 && (
                <PeopleTable people={visiblePeople} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
