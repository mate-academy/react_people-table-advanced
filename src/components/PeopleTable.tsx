import React from 'react';
import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonInfo } from './PersonInfo';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';
import { sortHeaders } from '../types/sortHeaders';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getSortParams = (sortBy: string) => {
    if (!sort || sort !== sortBy) {
      return {
        sort: sortBy,
      };
    }

    if (sort === sortBy && !order) {
      return {
        sort: sortBy,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortHeaders.map(header => (
            <th key={header.id}>
              <span className="is-flex is-flex-wrap-nowrap">
                {header.title}
                <SearchLink params={
                  getSortParams(header.sortBy) as SearchParams
                }
                >
                  <span className="icon">
                    <i className={cn('fas fa-sort', {
                      'fa-sort-up': sort === header.sortBy && !order,
                      'fa-sort-down': sort === header.sortBy && order,
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
          <PersonInfo
            key={person.slug}
            person={person}
            personId={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
