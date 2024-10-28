import { FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonTableColumns } from '../../types/PersonTableColumns';
import { Person } from '../../types';

import { PersonLink } from '../PersonLink';
import { SearchLink } from '../SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  people: Person[];
}

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const tableColumns = Object.values(PersonTableColumns);
  const { slug } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map(tableColumn => {
            const isNotParentColumn =
              tableColumn !== PersonTableColumns.MOTHER &&
              tableColumn !== PersonTableColumns.FATHER;

            const formattedTableColumn = tableColumn.toLowerCase();

            const toSortUp = sort === formattedTableColumn && !order;

            const toSortDown = sort === formattedTableColumn && order;

            return (
              <th key={tableColumn}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {tableColumn}

                  {isNotParentColumn && (
                    <SearchLink
                      params={{
                        sort: toSortDown ? null : formattedTableColumn,

                        order: toSortUp ? 'desc' : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={cn('fas', {
                            'fa-sort-up': toSortUp,
                            'fa-sort': sort !== formattedTableColumn,
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
