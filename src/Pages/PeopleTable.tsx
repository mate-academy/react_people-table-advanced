import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink';
import classNames from 'classnames';
import { normalizeSlug } from '../helper/functionHelp';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  persons: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ persons }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const sort = searchParams.get('sort');
  const desc = searchParams.get('order');

  function setTypeSort(sortType: string) {
    if (sort === sortType && desc === 'desc') {
      return getSearchWith(searchParams, { sort: null, order: null });
    } else if (sort && sort !== sortType) {
      return getSearchWith(searchParams, { sort: sortType, order: null });
    }

    return !searchParams.get('sort')
      ? getSearchWith(searchParams, { sort: sortType })
      : getSearchWith(searchParams, { order: 'desc' });
  }

  const getClassName = (sortType: string) => {
    return classNames('fas', {
      'fa-sort-up': sort === sortType && !desc,
      'fa-sort-down': sort === sortType && desc,
      'fa-sort': sort !== sortType,
    });
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
              <Link to={{ search: setTypeSort('name') }}>
                <span className="icon">
                  <i className={getClassName('name')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: setTypeSort('sex') }}>
                <span className="icon">
                  <i className={getClassName('sex')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: setTypeSort('born') }}>
                <span className="icon">
                  <i className={getClassName('born')} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: setTypeSort('died') }}>
                <span className="icon">
                  <i className={getClassName('died')} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <tr
            data-cy="person"
            key={`${person.name}${person.born}`}
            className={classNames({
              'has-background-warning':
                slug === `${normalizeSlug(person.name)}-${person.born}`,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                person.mother ? (
                  <PersonLink person={person.mother} />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                person.father ? (
                  <PersonLink person={person.father} />
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
