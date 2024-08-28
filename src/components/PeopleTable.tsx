import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { Link, useSearchParams } from 'react-router-dom';

type Props = {
  peopleFromServer: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleFromServer }) => {
  const [searchParams] = useSearchParams();
  const sortQ = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getSortingParams = (sortBy: string) => {
    const preparedSort = sortBy.toLowerCase();

    if (sortQ !== preparedSort) {
      // Если сортировка по новому столбцу, начнем с 'asc'
      return { sort: preparedSort, order: null };
    }

    if (!currentOrder) {
      // Если сортировка по текущему столбцу, но порядок не установлен, вернем 'desc'
      return { sort: preparedSort, order: 'desc' };
    }

    // Если порядок уже установлен, сбрасываем сортировку
    return { sort: null, order: null };
  };

  const createSortLink = (sortColumn: string) => {
    const params = new URLSearchParams(searchParams);
    const { sort, order } = getSortingParams(sortColumn);

    // Устанавливаем или удаляем параметры 'sort' и 'order' в зависимости от возвращаемых значений
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }

    if (order) {
      params.set('order', order);
    } else {
      params.delete('order');
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
                    className={`fas fa-sort${currentOrder === '' && sortQ === 'name' ? '-up' : currentOrder === 'desc' && sortQ === 'name' ? '-down' : ''}`}
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
                    className={`fas fa-sort${currentOrder === '' && sortQ === 'sex' ? '-up' : currentOrder === 'desc' && sortQ === 'sex' ? '-down' : ''}`}
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
                    className={`fas fa-sort${currentOrder === '' && sortQ === 'born' ? '-up' : currentOrder === 'desc' && sortQ === 'born' ? '-down' : ''}`}
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
                    className={`fas fa-sort${currentOrder === '' && sortQ === 'died' ? '-up' : currentOrder === 'desc' && sortQ === 'died' ? '-down' : ''}`}
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
