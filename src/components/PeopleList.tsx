import { useParams, useSearchParams } from 'react-router-dom';
import React from 'react';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortType, getSortParams } from '../utils/sortHelpers';
import { SearchKey } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleList: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const curSort = searchParams.get(SearchKey.SORT) || '';
  const curOrder = searchParams.get(SearchKey.ORDER) || '';

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortType).map((sortVal) => (
            <th key={sortVal}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortVal}
                <SearchLink
                  params={getSortParams(sortVal, curSort, curOrder)}
                >
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': curSort !== sortVal,
                        'fa-sort-up': curSort === sortVal && !curOrder,
                        'fa-sort-down': curSort === sortVal && !!curOrder,
                      })}
                    />
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
        {people.map(person => {
          const {
            slug,
            sex,
            born,
            died,
            mother,
            motherName,
            father,
            fatherName,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': personSlug === slug,
              })}
            >
              <PersonLink person={person} />
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              {mother ? (
                <PersonLink person={mother} />
              ) : (
                <td>{motherName || '-'}</td>
              )}
              {father ? (
                <PersonLink person={father} />
              ) : (
                <td>{fatherName || '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
