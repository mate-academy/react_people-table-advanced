import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SORT_BY_FIELDS } from '../constants/app.constants';

type Props = {
  people: Person[],
};

const SORT_PARAM = 'sort';
const ORDER_PARAM = 'order';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get(SORT_PARAM) || null;
  const order = searchParams.get(ORDER_PARAM) || null;

  const getSortParams = (category: string) => {
    if (sort !== category) {
      return { sort: category, order: null };
    }

    if (sort === category && !order) {
      return { sort: category, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {SORT_BY_FIELDS.map(category => {
            const preparedCategory = category.toLowerCase();

            return (
              <th key={category}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {category}
                  <SearchLink
                    params={getSortParams(preparedCategory)}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', 'fa-sort', {
                          'fa-sort-up': sort === preparedCategory && !order,
                          'fa-sort-down':
                          sort === preparedCategory && order,
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => (
          <PersonLink
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
