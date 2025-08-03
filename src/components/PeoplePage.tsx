import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { getPeople } from '../api';
import { Person } from '../types/Person';

type SortField = 'name' | 'sex' | 'born' | 'died';
type SortOrder = 'asc' | 'desc';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sortField = (searchParams.get('sort') || 'name') as SortField;
  const sortOrder = (searchParams.get('order') || 'asc') as SortOrder;

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // Фильтрация по query (name, motherName, fatherName)
  const filteredPeople = people.filter(person => {
    if (!query) {
      return true;
    }

    const nameMatch = person.name.toLowerCase().includes(query);
    const motherMatch = person.motherName?.toLowerCase().includes(query);
    const fatherMatch = person.fatherName?.toLowerCase().includes(query);

    return nameMatch || motherMatch || fatherMatch;
  });

  // Сортировка
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    let aField = a[sortField];
    let bField = b[sortField];

    // Если поля даты (born, died), приводим к числу для корректного сравнения
    if (sortField === 'born' || sortField === 'died') {
      aField = aField || 0;
      bField = bField || 0;

      return sortOrder === 'asc' ? aField - bField : bField - aField;
    }

    // Для строки и пола
    if (typeof aField === 'string' && typeof bField === 'string') {
      if (sortOrder === 'asc') {
        return aField.localeCompare(bField);
      }

      return bField.localeCompare(aField);
    }

    return 0;
  });

  // Функция для обновления параметров сортировки в URL
  const handleSortChange = (field: SortField) => {
    let order: SortOrder = 'asc';

    if (field === sortField) {
      // Если кликаем на ту же колонку, меняем порядок сортировки
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    }

    // Обновляем URL-параметры
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', field);
    newParams.set('order', order);
    setSearchParams(newParams);
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column is-7-tablet is-narrow-desktop">
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {isLoading && <Loader />}

              {isError && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!isLoading && !isError && people.length === 0 && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {!isLoading && !isError && people.length > 0 && (
                <>
                  {sortedPeople.length === 0 && (
                    <p>
                      There are no people matching the current search criteria
                    </p>
                  )}
                  {sortedPeople.length > 0 && (
                    <PeopleTable
                      people={sortedPeople}
                      sortField={sortField}
                      sortOrder={sortOrder}
                      onSortChange={handleSortChange}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
