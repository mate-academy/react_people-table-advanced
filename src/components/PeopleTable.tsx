import React from 'react';
import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  data: Person[] | null;
}

type Order = 'ask' | 'desc' | 'without';

export const PeopleTable: React.FC<Props> = ({ data }) => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();

  const getPersonSlug = (name: string, born: number) =>
    `${name.toLowerCase().trim().replace(/\s+/g, '-')}-${born}`;

  const getPersonByName = (name: string | null) =>
    data?.find(person => person.name === name) || null;

  const renderSortableHeader = (label: string, field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = (searchParams.get('order') as Order) || 'ask';
    const isActive = currentSort === field;

    const getNextOrder = (): Order => {
      if (!isActive || currentOrder === 'without') {
        return 'ask';
      }

      if (currentOrder === 'ask') {
        return 'desc';
      }

      return 'without';
    };

    const nextOrder = getNextOrder();
    const newParams = new URLSearchParams(searchParams.toString());

    if (nextOrder === 'without') {
      newParams.delete('sort');
      newParams.delete('order');
    } else {
      newParams.set('sort', field);
      if (nextOrder === 'desc') {
        newParams.set('order', 'desc');
      } else {
        newParams.delete('order'); // `ask` — без параметра `order`
      }
    }

    return (
      <span
        className="is-flex is-flex-wrap-nowrap"
        style={{ cursor: 'pointer' }}
      >
        {label}
        <Link to={`?${newParams.toString()}`}>
          <span className="icon">
            {isActive && currentOrder === 'ask' && (
              <i className="fas fa-sort-up" />
            )}
            {isActive && currentOrder === 'desc' && (
              <i className="fas fa-sort-down" />
            )}
            {!isActive || currentOrder === 'without' ? (
              <i className="fas fa-sort" />
            ) : null}
          </span>
        </Link>
      </span>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>{renderSortableHeader('Name', 'name')}</th>
          <th>{renderSortableHeader('Sex', 'sex')}</th>
          <th>{renderSortableHeader('Born', 'born')}</th>
          <th>{renderSortableHeader('Died', 'died')}</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {data?.map(person => {
          const slug = getPersonSlug(person.name, person.born);
          const mother = getPersonByName(person.motherName || null);
          const father = getPersonByName(person.fatherName || null);

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personId === slug,
              })}
            >
              <td>
                <PersonLink
                  person={person}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  mother ? (
                    <PersonLink person={mother} className="has-text-danger" />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  father ? (
                    <PersonLink person={father} />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
