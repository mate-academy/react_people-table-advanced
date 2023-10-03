import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { SearchLink } from '../SeachLink/SearchLink';
import {
  TABLE_COLUMNS_WITHOUT_SORTING,
  FEMALE,
} from '../../variables/constants';
import { SearchOptionsType, SortListType } from '../../types/SearchTypes';
import { SearchParams } from '../../utils/searchHelper';
import { usePeopleToRender } from '../../hooks/usePeopleToRender';

type Props = {
  people: Person[],
};

export const PeopleList: React.FC<Props> = ({
  people,
}) => {
  const peopleToRender = usePeopleToRender(people);
  const { personId } = useParams();
  const [searchParams] = useSearchParams();
  const normalizedParams = searchParams.toString();
  const sort = searchParams.get(SearchOptionsType.Sort) || null;
  const order = searchParams.get(SearchOptionsType.Order) || null;

  const getSortParams = (sortKey: SortListType): SearchParams => {
    if (sort !== sortKey) {
      const newSortParams: SearchParams = {
        [SearchOptionsType.Sort]: sortKey,
        [SearchOptionsType.Order]: null,
      };

      return newSortParams;
    }

    if (sort === sortKey && !order) {
      return { [SearchOptionsType.Order]: 'desc' };
    }

    return {
      [SearchOptionsType.Sort]: null,
      [SearchOptionsType.Order]: null,
    };
  };

  if (!peopleToRender.length) {
    return (
      <p>
        There are no people matching the current search criteria
      </p>
    );
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(SortListType).map(([key, value]) => {
            const sortParams = getSortParams(value);

            return (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink
                    params={sortParams}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== value,
                          'fa-sort-up': sort === value && !order,
                          'fa-sort-down': sort === value && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          {TABLE_COLUMNS_WITHOUT_SORTING.map(column => (
            <th>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {peopleToRender.map(person => {
          const {
            name,
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
            mother,
            father,

          } = person;

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({
                'has-background-warning': personId === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${slug}?${normalizedParams}`}
                  className={cn({
                    'has-text-danger': sex === FEMALE,
                  })}
                >
                  {name}
                </Link>
              </td>

              <td>
                {sex}
              </td>
              <td>
                {born}
              </td>
              <td>
                {died}
              </td>
              <td>
                {mother?.slug ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${mother?.slug}?${normalizedParams}`}
                  >
                    {motherName}
                  </Link>
                ) : (
                  motherName
                )}
              </td>
              <td>
                {father ? (
                  <Link
                    to={`/people/${father?.slug}?${normalizedParams}`}
                  >
                    {fatherName}
                  </Link>
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
