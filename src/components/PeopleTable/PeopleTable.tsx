import React from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { getSortedPeople } from '../../utils/getSortedPeople';
import { SortTypes } from '../../types/SortTypes';
import { SortIcon } from '../SortIcon';

type Props = {
  people: Person[]
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const isReversed = searchParams.get('order') === 'desc';

  const visiblePeople = [...people];

  const getParamsWithSort = (sortBy: SortTypes) => {
    if (sort as SortTypes !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!isReversed) {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  getSortedPeople(visiblePeople, sort as SortTypes, isReversed);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortTypes).map(([key, value]) => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink
                  params={getParamsWithSort(value)}
                >
                  <SortIcon
                    sort={sort}
                    isReversed={isReversed}
                    sortType={value}
                  />
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
            className={cn({
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
              {person.mother
                ? (
                  <PersonLink person={person.mother} />
                )
                : <p>{person.motherName}</p>}
              {!person.motherName && '-' }
            </td>

            <td>
              {person.father
                ? (
                  <PersonLink person={person.father} />
                )
                : <p>{person.fatherName}</p>}
              {!person.fatherName && '-' }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
