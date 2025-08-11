// components/PeoplePage.tsx

import { useEffect, useState, useMemo } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { PeopleFilters } from './PeopleFilters';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types/Person';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

type SortableFields = 'name' | 'sex' | 'born' | 'died';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false); // Стан для відстеження помилок

  const [searchParams, setSearchParamsState] = useState<URLSearchParams>(
    new URLSearchParams(),
  );

  // Функція для отримання поточних пошукових параметрів з URL
  const getCurrentSearchParams = (): URLSearchParams => {
    const hash = window.location.hash;
    const queryIndex = hash.indexOf('?');

    if (queryIndex === -1) {
      return new URLSearchParams();
    }

    const searchString = hash.substring(queryIndex + 1);

    return new URLSearchParams(searchString);
  };

  // Функція для оновлення пошукових параметрів
  const updateSearchParams = (paramsToUpdate: SearchParams) => {
    const newSearch = getSearchWith(searchParams, paramsToUpdate);
    const baseHash = window.location.hash.split('?')[0];

    window.location.hash = `${baseHash}?${newSearch}`;
  };

  // Завантажуємо дані з API при першому рендері
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setHasError(false); // Скидаємо стан помилки перед новим запитом

      try {
        const dataFromServer = await getPeople();

        setPeople(dataFromServer);
      } catch (error) {
        setHasError(true); // Встановлюємо стан помилки при виникненні помилки
      } finally {
        setIsLoading(false); // Завжди вимикаємо лоудер після завершення запиту
      }
    };

    loadData();
  }, []);

  // Ініціалізуємо пошукові параметри при завантаженні компонента та при зміні хешу
  useEffect(() => {
    const handleHashChange = () => {
      const currentParams = getCurrentSearchParams();

      setSearchParamsState(currentParams);
    };

    // Додаємо слухача подій для зміни хешу
    window.addEventListener('hashchange', handleHashChange);

    // Ініціалізуємо пошукові параметри при першому рендері
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Фільтруємо та сортуємо людей на основі пошукових параметрів
  const getFilteredAndSortedPeople = (): Person[] => {
    let filteredPeople = [...people];

    // Фільтр за ім'ям
    const nameFilter = searchParams.get('name')?.toLowerCase() || '';

    if (nameFilter) {
      filteredPeople = filteredPeople.filter(
        person =>
          person.name.toLowerCase().includes(nameFilter) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(nameFilter)) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(nameFilter)),
      );
    }

    // Фільтр за статтю
    const sexFilter = searchParams.get('sex');

    if (sexFilter) {
      filteredPeople = filteredPeople.filter(
        person => person.sex === sexFilter,
      );
    }

    // Фільтр за століттями
    const centuries = searchParams.getAll('centuries');

    if (centuries.length > 0) {
      filteredPeople = filteredPeople.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
    }

    // Сортування
    const sortField = searchParams.get('sort') as SortableFields | null;
    const sortOrder = searchParams.get('order'); // 'asc' або 'desc'

    if (sortField) {
      filteredPeople.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        // Перевірка, чи значення є string або number
        if (
          (typeof aValue !== 'string' && typeof aValue !== 'number') ||
          (typeof bValue !== 'string' && typeof bValue !== 'number')
        ) {
          return 0;
        }

        let comparison = 0;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
        } else {
          comparison = (aValue as number) - (bValue as number);
        }

        if (comparison < 0) {
          return sortOrder === 'desc' ? 1 : -1;
        }

        if (comparison > 0) {
          return sortOrder === 'desc' ? -1 : 1;
        }

        return 0;
      });
    }

    return filteredPeople;
  };

  const filteredAndSortedPeople = useMemo(
    () => getFilteredAndSortedPeople(),
    [people, searchParams],
  );

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {/* Права колонка з фільтрами, показується лише коли люди завантажені */}
          {!isLoading && !hasError && people.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters
                searchParams={searchParams}
                updateSearchParams={updateSearchParams}
              />
            </div>
          )}

          {/* Ліва колонка з таблицею або повідомленнями */}
          <div className="column">
            <div className="box table-container" style={{ minHeight: '200px' }}>
              {isLoading ? (
                // Показуємо лоудер, поки дані не підвантажились
                <Loader />
              ) : hasError ? (
                // Показуємо повідомлення про помилку, якщо виникла помилка під час завантаження
                <p data-cy="peopleLoadingError">Something went wrong</p>
              ) : filteredAndSortedPeople.length === 0 ? (
                // Показуємо повідомлення, якщо після фільтрації людей немає
                <p data-cy="noPeopleMessage">
                  There are no people on the server matching the criteria
                </p>
              ) : (
                // Показуємо таблицю, коли дані завантажено і масив не порожній
                <PeopleTable
                  people={filteredAndSortedPeople}
                  searchParams={searchParams}
                  updateSearchParams={updateSearchParams}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
