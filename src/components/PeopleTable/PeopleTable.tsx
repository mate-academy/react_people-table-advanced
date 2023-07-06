import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[];
  sort: string | null;
  order: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, sort, order }) => {
  const { slug = '' } = useParams();

  const handleSortChange = (value: string) => {
    const isFirstClick = sort !== value;
    const isSecondClick = sort === value && order === null;

    if (isFirstClick) {
      return ({
        sort: value,
        order: null,
      });
    }

    if (isSecondClick) {
      return ({
        sort: value,
        order: 'desc',
      });
    }

    return ({
      sort: null,
      order: null,
    });
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['Name', 'Sex', 'Born', 'Died'].map(title => {
            const value = title.toLowerCase();

            return (
              <th key={title}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {title}
                  <SearchLink
                    params={handleSortChange(value)}
                  >
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': sort !== value,
                          'fa-sort-up': sort === value && order === null,
                          'fa-sort-down': sort === value && order === 'desc',
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
          <PersonInfo
            key={person.slug}
            person={person}
            selectedPersonSlug={slug}
          />
        ))}
      </tbody>
    </table>
  );
};
