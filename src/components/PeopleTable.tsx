import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

const SORTING_TYPES = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (newSort: string) => {
    if (sort !== newSort) {
      return { sort: newSort, order: null };
    }

    if (sort && !order) {
      return { sort: newSort, order: 'desc' };
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
          {Object.entries(SORTING_TYPES).map(([sortType, name]) => (
            <th key={sortType}>
              <span className="is-flex is-flex-wrap-nowrap">
                {name}
                <SearchLink params={getSortParams(sortType)}>
                  <span className="icon">
                    <i className={classNames('fas', {
                      'fa-sort': sort !== sortType,
                      'fa-sort-up': sort === sortType && !order,
                      'fa-sort-down': sort === sortType && order === 'desc',
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
        {people.map(person => (
          <PersonRow person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
