import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  peopleFromServer: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleFromServer }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  // Определите новое состояние для сортировки
  const getNextOrder = (sortBy: string) => {
    if (sortBy === '') {
      return ''; // Без сортировки, если ничего не выбрано
    }

    if (currentOrder === '' && sortBy !== '') {
      return 'asc'; // Первоначальная сортировка по возрастанию
    }

    if (currentOrder === 'asc') {
      return 'desc'; // Сортировка по убыванию
    }

    if (currentOrder === 'desc') {
      return ''; // Без сортировки
    }

    return 'asc'; // Начальное значение для сортировки
  };

  // Функция для создания ссылки сортировки
  const createSortLink = (sortBy: string) => {
    const newOrder = getNextOrder(sortBy);
    const params = new URLSearchParams(searchParams);

    if (newOrder === '') {
      // Удаление параметров 'sort' и 'order', если сбрасывается сортировка
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', sortBy);
      params.set('order', newOrder);
    }

    return `/people?${params.toString()}`;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={createSortLink('name')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${currentOrder === 'asc' && sortBy === 'name' ? '-up' : currentOrder === 'desc' && sortBy === 'name' ? '-down' : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={createSortLink('sex')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${currentOrder === 'asc' && sortBy === 'sex' ? '-up' : currentOrder === 'desc' && sortBy === 'sex' ? '-down' : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={createSortLink('born')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${currentOrder === 'asc' && sortBy === 'born' ? '-up' : currentOrder === 'desc' && sortBy === 'born' ? '-down' : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={createSortLink('died')}>
                <span className="icon">
                  <i
                    className={`fas fa-sort${currentOrder === 'asc' && sortBy === 'died' ? '-up' : currentOrder === 'desc' && sortBy === 'died' ? '-down' : ''}`}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleFromServer.map(person => (
          <PersonLink
            key={person.slug}
            people={person}
            allPeople={peopleFromServer}
          />
        ))}
      </tbody>
    </table>
  );
};
