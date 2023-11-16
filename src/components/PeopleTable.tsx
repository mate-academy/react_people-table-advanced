import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonRow } from './PersonRow';
import { SortTypes } from '../types/SortTypes';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../types/SearchParams';
import { capitalize } from '../utils/capitalize';

type Props = {
  people: Person[]
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const sortParams = (type: string) => {
    const params: SearchParams = {};

    if (sort !== type) {
      params.sort = type;
      params.order = null;
    }

    if (sort === type && !order) {
      params.order = 'desc';
    }

    if (sort === type && order === 'desc') {
      params.sort = null;
      params.order = null;
    }

    return params;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortTypes).map(type => (
            <th key={type}>
              <span className="is-flex is-flex-wrap-nowrap">
                {capitalize(type)}
                <SearchLink
                  params={sortParams(type)}
                >
                  <span className="icon">
                    <i className={cn(
                      'fas',
                      {
                        'fa-sort': sort !== type,
                        'fa-sort-up': sort === type && !order,
                        'fa-sort-down': sort === type && order,
                      },
                    )}
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
          <PersonRow key={person.slug} person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
