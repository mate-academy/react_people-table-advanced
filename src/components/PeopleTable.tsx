/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import data from '../../public/api/people.json';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

const getSlugByName = (name: string) => {
  const person = data.find(p => p.name === name);

  return person ? person.slug : null;
};

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();

  const sortBy = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  const sortedPeople = [...people].sort((a, b) => {
    let comparison = 0;

    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'sex') {
      comparison = a.sex.localeCompare(b.sex);
    } else if (sortBy === 'born') {
      comparison = a.born - b.born;
    } else if (sortBy === 'died') {
      comparison = a.died - b.died;
    }

    return order === 'desc' ? -comparison : comparison;
  });

  const getSortLink = (column: string) => {
    const isActive = sortBy === column;
    const newOrder =
      isActive && order === 'asc'
        ? 'desc'
        : isActive && order === 'desc'
          ? ''
          : 'asc';
    const newSearchParams = new URLSearchParams(searchParams);

    if (newOrder) {
      newSearchParams.set('sort', column);
      newSearchParams.set('order', newOrder);
    } else {
      newSearchParams.delete('sort');
      newSearchParams.delete('order');
    }

    return `?${newSearchParams.toString()}`;
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
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sortBy === 'name' && order === 'asc',
                      'fa-sort-down': sortBy === 'name' && order === 'desc',
                      'fa-sort': sortBy !== 'name',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={getSortLink('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sortBy === 'sex' && order === 'asc',
                      'fa-sort-down': sortBy === 'sex' && order === 'desc',
                      'fa-sort': sortBy !== 'sex',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={getSortLink('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sortBy === 'born' && order === 'asc',
                      'fa-sort-down': sortBy === 'born' && order === 'desc',
                      'fa-sort': sortBy !== 'born',
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={getSortLink('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort-up': sortBy === 'died' && order === 'asc',
                      'fa-sort-down': sortBy === 'died' && order === 'desc',
                      'fa-sort': sortBy !== 'died',
                    })}
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
        {sortedPeople.map((person: Person) => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': person.slug === slug,
            })}
            data-cy="person"
          >
            <td>
              <Link
                className={person.sex === 'f' ? 'has-text-danger' : ''}
                to={`/people/${person.slug}`}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                data.some(p => p.name === person.motherName) ? (
                  <Link
                    to={`/people/${getSlugByName(person.motherName)}`}
                    className="has-text-danger"
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                data.some(p => p.name === person.fatherName) ? (
                  <Link to={`/people/${getSlugByName(person.fatherName)}`}>
                    {person.fatherName}
                  </Link>
                ) : (
                  person.fatherName
                )
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
