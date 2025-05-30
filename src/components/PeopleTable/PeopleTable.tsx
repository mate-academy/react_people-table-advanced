import React from 'react';
import { Person } from '../../types';
import { PersonItem } from '../PersonItem/PersonItem';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handlerfilterBySort = (sortFilter: string): SearchParams => {
    if (sort === sortFilter) {
      if (order === 'desc') {
        return { sort: null, order: null };
      }

      return { sort, order: 'desc' };
    }

    return { sort: sortFilter, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(sortBy => (
            <th key={`sort-${sortBy}`}>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortBy}
                <SearchLink params={handlerfilterBySort(sortBy.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort': sort !== sortBy.toLowerCase(),
                        'fa-sort-up': sort === sortBy.toLowerCase() && !order,
                        'fa-sort-down': sort === sortBy.toLowerCase() && order,
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
        {people?.map(person => (
          <PersonItem key={person.slug} people={people} person={person} />
        ))}
      </tbody>
    </table>
  );
};
