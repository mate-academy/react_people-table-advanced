/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import React from 'react';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const sortParams = (value: string) => {
    if (
      searchParams.has('sort') &&
      searchParams.has('order') &&
      value === sort
    ) {
      return { sort: null, order: null };
    }

    return sort === value
      ? { sort, order: 'desc' }
      : { sort: value, order: null };
  };

  const getSortIconClass = (field: string) => {
    if (sort !== field || !sort) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const isSelected = people.find(person => person.slug === slug);

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
              <SearchLink params={sortParams('name')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('name'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={sortParams('sex')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('sex'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={sortParams('born')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('born'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={sortParams('died')}>
                <span className="icon">
                  <i className={classNames('fas', getSortIconClass('died'))} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug: personSlug,
          } = person;

          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              key={personSlug}
              className={classNames({
                'has-background-warning': isSelected?.slug === personSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>
              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
