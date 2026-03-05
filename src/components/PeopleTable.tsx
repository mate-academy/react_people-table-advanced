/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type PeopleTableProps = {
  people: Person[];
};

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortedPeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    const sorted = [...people].sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'sex':
          return a.sex.localeCompare(b.sex);
        case 'born':
          return a.born - b.born;
        case 'died':
          return a.died - b.died;
        default:
          return 0;
      }
    });

    return order === 'desc' ? sorted.reverse() : sorted;
  }, [people, sort, order]);

  const handleSort = (column: string) => {
    const isSameColumn = sort === column;
    const nextOrder = isSameColumn && order !== 'desc' ? 'desc' : undefined;

    const params = new URLSearchParams(searchParams);

    if (!nextOrder && isSameColumn) {
      params.delete('sort');
      params.delete('order');
    } else {
      params.set('sort', column);

      if (nextOrder) {
        params.set('order', nextOrder);
      } else {
        params.delete('order');
      }
    }

    setSearchParams(params);
  };

  const handleSortIcon = (column: string): string => {
    if (column === sort) {
      if (order === 'desc') {
        return 'fa-sort-down';
      }

      return 'fa-sort-up';
    }

    return 'fa-sort';
  };

  const hasParentOnTheList = (parentName?: string) => {
    return people?.find(person => person.name === parentName) ?? null;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(column => (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.charAt(0).toUpperCase() + column.slice(1)}
                <a onClick={() => handleSort(column)}>
                  <span className="icon">
                    <i className={classNames('fas', handleSortIcon(column))} />
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            data-cy="person"
            key={person.name}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            {!person.motherName ? (
              <td>-</td>
            ) : hasParentOnTheList(person.motherName) ? (
              <td>
                <PersonLink person={hasParentOnTheList(person.motherName)} />
              </td>
            ) : (
              <td>{person.motherName}</td>
            )}

            {!person.fatherName ? (
              <td>-</td>
            ) : hasParentOnTheList(person.fatherName) ? (
              <td>
                <PersonLink person={hasParentOnTheList(person.fatherName)} />
              </td>
            ) : (
              <td>{person.fatherName}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
