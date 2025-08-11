import classNames from 'classnames';
import { Person } from '../types';
import { useParams, useSearchParams } from 'react-router-dom';
import React, { useCallback } from 'react';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  peopleList: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<PeopleTableProps> = ({ peopleList }) => {
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

  const findPersonByName = useCallback(
    (name: string | undefined | null): Person | null =>
      name
        ? peopleList.find(p => p.name.toLowerCase() === name.toLowerCase()) ||
          null
        : null,
    [peopleList],
  );

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
        {peopleList.map(person => {
          const mother = person.motherName
            ? findPersonByName(person.motherName)
            : null;
          const father = person.fatherName
            ? findPersonByName(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
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
              <td>
                {mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <PersonLink person={father} />
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
