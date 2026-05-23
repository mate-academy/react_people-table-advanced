import React, { useMemo } from 'react';
import { Person } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
  selectedPersonSlug: string;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortLink = (columnName: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === columnName) {
      if (order === 'desc') {
        params.delete('sort');
        params.delete('order');
      } else {
        params.set('order', 'desc');
      }
    } else {
      params.set('sort', columnName);
      params.set('order', 'asc');
    }

    return `?${params.toString()}`;
  };

  const sortedPeople = useMemo(() => {
    const sorted = [...people];
    const isDesc = order === 'desc';

    if (!sort) {
      return sorted;
    }

    sorted.sort((a, b) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = a.name.localeCompare(b.name, 'en');
          break;
        case 'sex':
          result = a.sex.localeCompare(b.sex);
          break;
        case 'born':
          result = a.born - b.born;
          break;
        case 'died':
          result = a.died - b.died;
          break;
        default:
          return 0;
      }

      return isDesc ? -result : result;
    });

    return sorted;
  }, [people, sort, order]);

  const renderSortIcon = (columnName: string) => {
    if (sort !== columnName) {
      return <i className="fas fa-sort" />;
    }

    return order === 'asc' ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
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
              <Link to={getSortLink('name')}>
                <span className="icon">{renderSortIcon('name')}</span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')}>
                <span className="icon">{renderSortIcon('sex')}</span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')}>
                <span className="icon">{renderSortIcon('born')}</span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')}>
                <span className="icon">{renderSortIcon('died')}</span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person) => {
          const motherInList = people.find(
            (per) => per.name === person.motherName,
          );
          const fatherInList = people.find(
            (per) => per.name === person.fatherName,
          );

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': person.slug === selectedPersonSlug,
              })}
            >
              <td>
                <Link
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                  to={`/people/${person.slug}`}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {motherInList ? (
                  <Link
                    to={`/people/${motherInList.slug}`}
                    className={classNames({
                      'has-text-danger': motherInList.sex === 'f',
                    })}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {fatherInList ? (
                  <Link to={`/people/${fatherInList.slug}`}>
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
