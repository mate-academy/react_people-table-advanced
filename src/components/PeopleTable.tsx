import React from 'react';

import { Person } from '../types';
import { columsByTable } from '../utils/peopleHelper';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

type Props = {
  people: Person[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sort = searchParams.get('sort');
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columsByTable.map(columnName => {
            const isShowIcon =
              columnName === 'Mother' || columnName === 'Father';

            const normalizedTableColumn = columnName.toLowerCase();

            const toSortUp = sort === normalizedTableColumn && !order;

            const toSortDown = sort === normalizedTableColumn && order;

            return (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {columnName}
                  {!isShowIcon && (
                    <SearchLink
                      params={{
                        sort: toSortDown ? null : normalizedTableColumn,

                        order: toSortUp ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort-up': toSortUp,
                            'fa-sort': sort !== normalizedTableColumn,
                            'fa-sort-down': toSortDown,
                          })}
                        />
                      </span>
                    </SearchLink>
                  )}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const { sex, born, died, motherName, fatherName } = person;
          const foundMother = people.find(mother => mother.name === motherName);
          const foundFather = people.find(father => father.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({ 'has-background-warning': person.slug === slug })}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {foundMother ? (
                  <PersonLink person={foundMother} />
                ) : (
                  <p>{motherName ? motherName : '-'}</p>
                )}
              </td>
              <td>
                {foundFather ? (
                  <PersonLink person={foundFather} />
                ) : (
                  <p>{fatherName ? fatherName : '-'}</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
