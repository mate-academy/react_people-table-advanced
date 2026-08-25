/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSearchParams, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
}

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { personSlug } = useParams<{ personSlug?: string }>();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  // Хелпер для визначення параметрів наступного стану сортування (3 стани)
  const getSortParams = (field: SortField) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  // Хелпер для відображення відповідної іконки сортування
  const getSortIconClass = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  // Функція для пошуку баба/мама/тато по slug для створення SearchLink
  const getPersonLink = (name?: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = people.find(p => p.name === name);

    if (!parent) {
      return name;
    }

    return (
      <Link
        to={`/people/${parent.slug}`}
        className={classNames({
          'has-text-danger': parent.sex === 'f',
        })}
      >
        {parent.name}
      </Link>
    );
  };

  const columns: { label: string; field: SortField }[] = [
    { label: 'Name', field: 'name' },
    { label: 'Sex', field: 'sex' },
    { label: 'Born', field: 'born' },
    { label: 'Died', field: 'died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={classNames('fas', getSortIconClass(field))} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === personSlug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': isSelected,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>{getPersonLink(person.motherName)}</td>
              <td>{getPersonLink(person.fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
