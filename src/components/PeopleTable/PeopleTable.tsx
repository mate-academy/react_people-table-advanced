import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';
import { handleSort, sortPeople } from '../../utils/filterHelper';
import { Field } from '../../types/Field';
import { getSearchParams } from '../../utils/searchParamsHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { sort, order, sex, query, centuries } = getSearchParams(searchParams);

  const getFieldClass = (fieldName: string) =>
    cn('fas', {
      'fa-sort': sort !== fieldName,
      'fa-sort-up': sort === fieldName && !order,
      'fa-sort-down': sort === fieldName && order,
    });

  const sortedPeople = sortPeople(people, sort as Field, !!order, {
    sex,
    query,
    centuries,
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(Field).map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={handleSort(value, sort, order)}>
                  <span className="icon">
                    <i className={getFieldClass(value)} />
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
        {sortedPeople.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
