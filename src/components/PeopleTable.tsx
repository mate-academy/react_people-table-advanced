/* eslint-disable jsx-a11y/control-has-associated-label */

/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import type { Person } from '../types';
import { PersonLink } from './PersonLink';

interface PeopleTableProps {
  people: Person[];
  selectedSlug?: string;
}

export const PeopleTable = ({ people, selectedSlug }: PeopleTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Отримуємо поточні параметри сортування з URL
  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  // Універсальна функція для зміни параметрів сортування в URL
  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sortBy !== field) {
      // Якщо обрано нове поле сортування: встановлюємо 'asc'
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    } else if (sortOrder === 'asc') {
      // Якщо вже було 'asc': змінюємо на 'desc'
      newParams.set('order', 'desc');
    } else {
      // Якщо було 'desc': повністю скидаємо сортування для цього поля
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  // Логіка сортування на основі даних з URL
  const sortPeople = (data: Person[]): Person[] => {
    if (!sortBy || !sortOrder) {
      return data;
    }

    const newPeople = [...data];

    return newPeople.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'sex':
          comparison = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          comparison = a.born - b.born;
          break;
        case 'died':
          comparison = a.died - b.died;
          break;
        default:
          return 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  };

  const sortedPeople = sortPeople(people);

  // Допоміжна функція для побудови правильного href (для підтримки SEO/доступності)
  const getSortHref = (field: string) => {
    const tempParams = new URLSearchParams(searchParams);

    if (sortBy !== field) {
      tempParams.set('sort', field);
      tempParams.set('order', 'asc');
    } else if (sortOrder === 'asc') {
      tempParams.set('order', 'desc');
    } else {
      tempParams.delete('sort');
      tempParams.delete('order');
    }

    return `#/people?${tempParams.toString()}`;
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
              <a
                href={getSortHref('name')}
                onClick={event => {
                  event.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'name'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href={getSortHref('sex')}
                onClick={event => {
                  event.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'sex'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href={getSortHref('born')}
                onClick={event => {
                  event.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'born'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href={getSortHref('died')}
                onClick={event => {
                  event.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${
                      sortBy === 'died'
                        ? sortOrder === 'asc'
                          ? 'fa-sort-up'
                          : 'fa-sort-down'
                        : 'fa-sort'
                    }`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(item => {
          const father = people.find(
            personItem => personItem.name === item.fatherName,
          );

          const mother = people.find(
            personItem => personItem.name === item.motherName,
          );

          return (
            <tr
              data-cy="person"
              key={item.slug}
              className={
                item.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <PersonLink person={item} />
              </td>
              <td>{item.sex}</td>
              <td>{item.born}</td>
              <td>{item.died}</td>

              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  item.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <PersonLink person={father} />
                ) : (
                  item.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
