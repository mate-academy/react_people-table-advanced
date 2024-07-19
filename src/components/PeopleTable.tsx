/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

enum Sort {
  name = 'name',
  sex = 'sex',
  born = 'born',
  died = 'died',
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;
  const sortedPeople = [...people];

  const getSortParams = (sortBy: Sort) => {
    if (sort === sortBy && !order) {
      return { sort: sortBy, order: 'desc' };
    }

    if (sort !== sortBy) {
      return { sort: sortBy, order: null };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (sortBy: Sort) => {
    return classNames('fas', {
      'fa-sort': sort !== sortBy,
      'fa-sort-up': sort === sortBy && !order,
      'fa-sort-down': sort === sortBy && order,
    });
  };

  if (sort) {
    sortedPeople.sort((a, b) => {
      switch (sort) {
        case Sort.name:
        case Sort.sex:
          if (order) {
            return b[sort].localeCompare(a[sort]);
          }

          return a[sort].localeCompare(b[sort]);

        case Sort.born:
        case Sort.died:
          if (order) {
            return b[sort] - a[sort];
          }

          return a[sort] - b[sort];

        default:
          return 0;
      }
    });
  }

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
              <SearchLink params={getSortParams(Sort.name)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams(Sort.sex)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams(Sort.born)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams(Sort.died)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.died)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map((person, index) => (
          <tr
            key={index}
            data-cy="person"
            className={classNames({
              'has-background-warning': slug === person.slug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <PersonLink person={person.mother} />
              ) : (
                person.motherName ?? '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName ?? '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
