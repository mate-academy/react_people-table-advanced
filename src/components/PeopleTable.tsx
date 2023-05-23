import React, { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { Human } from './Human';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = React.memo(({ people }) => {
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
          {['Name', 'Sex', 'Born', 'Died'].map(columnName => {
            const lowerColumnName = columnName.toLowerCase();
            const isThisColumn = sort === lowerColumnName;

            const params: SearchParams = {
              ...(!isThisColumn && { sort: lowerColumnName, order: null }),
              ...(isThisColumn && !order && { order: 'desc' }),
              ...(isThisColumn && order && { sort: null, order: null }),
            };

            return (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  <SearchLink params={params}>
                    <span className="icon">
                      <i className={classNames('fas', {
                        'fa-sort': !isThisColumn,
                        'fa-sort-up': isThisColumn && !order,
                        'fa-sort-down': isThisColumn && order,
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
        {people.map(person => {
          const human = {
            ...person,
            father: people.find(({ name }) => (
              name === person.fatherName
            )),
            mother: people.find(({ name }) => (
              name === person.motherName
            )),
          };

          return (
            <Human key={person.name} person={human} />
          );
        })}
      </tbody>
    </table>
  );
});
