import React from 'react';
import { Person } from '../../types';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonInfo } from '../PersonInfo';
import { SearchLink } from '../SearchLink';
import cn from 'classnames';

interface Props {
  peopleList: Person[];
}

const tableSortTitles = {
  Name: 'name',
  Sex: 'sex',
  Born: 'born',
  Died: 'died',
};

export const PeopleTable: React.FC<Props> = ({ peopleList }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.entries(tableSortTitles).map(([key, value]) => {
            const isSort = sort === value;
            const isOrderDesc = order === 'desc';

            const sortParams = (param: string) => {
              if (!isSort) {
                return { sort: param, order: null };
              }

              if (!isOrderDesc) {
                return { sort: param, order: 'desc' };
              }

              return { sort: null, order: null };
            };

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={sortParams(value)}>
                    <span className="icon">
                      <i
                        className={cn(
                          'fas',
                          { 'fa-sort': !isSort },
                          { 'fa-sort-up': isSort && !isOrderDesc },
                          { 'fa-sort-down': isSort && isOrderDesc },
                        )}
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
        {peopleList.map(person => {
          const isActive = person.slug === slug;

          return (
            <PersonInfo key={person.slug} person={person} isActive={isActive} />
          );
        })}
      </tbody>
    </table>
  );
};
