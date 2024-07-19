/* eslint-disable react/display-name */
import React, { memo } from 'react';
import { Person } from '../../types';
import { SortTypes } from './types';
import { SearchLink } from '../SearchLink';
import { useLocation, useParams } from 'react-router-dom';
import { SearchParams } from '../../utils/searchHelper';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

interface Props {
  visiblePeople: Person[];
}

export const PeopleTable = memo(({ visiblePeople }: Props) => {
  const { slug } = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const toggleSortType = (sortType: SortTypes): SearchParams => {
    const newParams: SearchParams = {};

    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort === sortType) {
      if (!currentOrder) {
        newParams.order = 'desc';
      } else {
        newParams.sort = null;
        newParams.order = null;
      }
    } else {
      newParams.sort = sortType;
      newParams.order = null;
    }

    return newParams;
  };

  const getIconClass = (sortType: SortTypes) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort === sortType && !currentOrder) {
      return 'fa-sort-up';
    } else if (currentSort === sortType && currentOrder === 'desc') {
      return 'fa-sort-down';
    } else {
      return 'fa-sort';
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortTypes).map(([title, sortType]) => (
            <th key={sortType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <SearchLink params={toggleSortType(sortType)}>
                  <span className="icon">
                    <i className={classNames('fas', getIconClass(sortType))} />
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
        {visiblePeople.map(person => (
          <tr
            key={person.slug}
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
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <PersonLink person={person.father} />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
