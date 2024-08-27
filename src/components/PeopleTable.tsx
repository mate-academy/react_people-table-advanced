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

  // Определите следующее состояние для сортировки
  const getNextOrder = (sortColumn: string) => {
    if (sortBy !== sortColumn) {
      return 'asc'; // Если сортировка по новому столбцу, начнем с 'asc'
    }

    if (currentOrder === 'asc') {
      return 'desc'; // Если текущий порядок 'asc', следующий будет 'desc'
    }

    if (currentOrder === 'desc') {
      return ''; // Если текущий порядок 'desc', сбросим сортировку
    }

    return 'asc'; // Если сортировка отсутствует, начнем с 'asc'
  };

  // Функция для создания ссылки сортировки
  const createSortLink = (sortColumn: string) => {
    const newOrder = getNextOrder(sortColumn);
    const params = new URLSearchParams(searchParams);

    console.log(newOrder + ' order');

    if (newOrder === '') {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', sortColumn);
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
