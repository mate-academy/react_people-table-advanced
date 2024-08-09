/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { Sort } from '../types/Sort';
import { getSortParams } from '../utils/getSortParams';
import { sortPeople } from '../utils/sortPeople';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get('sort');
  const sort: Sort | null = Object.values(Sort).includes(sortParam as Sort)
    ? (sortParam as Sort)
    : null;

  const order = searchParams.get('order') || null;
  const sortedPeople = sortPeople(people, sort, order);

  const getSortIcon = (sortBy: Sort) => {
    return classNames('fas', {
      'fa-sort': sort !== sortBy,
      'fa-sort-up': sort === sortBy && !order,
      'fa-sort-down': sort === sortBy && order,
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
              <SearchLink params={getSortParams(sort, order, Sort.name)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.name)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams(sort, order, Sort.sex)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.sex)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams(sort, order, Sort.born)}>
                <span className="icon">
                  <i className={getSortIcon(Sort.born)} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams(sort, order, Sort.died)}>
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
