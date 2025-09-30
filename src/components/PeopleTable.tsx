import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import React from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

type SortOrdersType = 'Name' | 'Sex' | 'Born' | 'Died';

export const PeopleTable = ({ peoples }: { peoples: Person[] }) => {
  const [searchParams] = useSearchParams();
  const sort = (searchParams.get('sort') as keyof Person) || '';
  const isDesc = searchParams.has('order');
  const sortOrders: SortOrdersType[] = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOrders.map(key => {
            const keyToParam = key.toLocaleLowerCase();
            const sotrParams = {
              sort: isDesc && sort === keyToParam ? null : keyToParam,
              order:
                (isDesc && sort === keyToParam) || !sort || sort !== keyToParam
                  ? null
                  : 'desc',
            };

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={sotrParams}>
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          {
                            'fa-sort':
                              (!isDesc && !sort) || sort !== keyToParam,
                          },
                          {
                            'fa-sort-up': !isDesc && sort === keyToParam,
                          },
                          {
                            'fa-sort-down': isDesc && sort === keyToParam,
                          },
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
        {peoples.map(person => {
          const personWithParent = {
            ...person,
            mother: peoples.find(a => a.name === person.motherName),
            father: peoples.find(a => a.name === person.fatherName),
          };

          return <PersonLink key={person.slug} person={personWithParent} />;
        })}
      </tbody>
    </table>
  );
};
