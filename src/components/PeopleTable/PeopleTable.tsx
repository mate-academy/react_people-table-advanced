import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { ColumnNames } from '../../types/ColumnNames';
import { SearchLink } from '../SearchLink/SearchLink';
import { SearchParams } from '../../utils/searchHelper';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { personSlug } = useParams();

  const sortParams = (param: string) => {
    if (sort !== param) {
      return {
        sort: param,
        order: null,
      };
    }

    if (sort === param && order !== 'desc') {
      return { order: 'desc' };
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
          {Object.values(ColumnNames).map((columnName) => {
            const isSortColumn = sort === columnName;
            const isSortUp = isSortColumn && order !== 'desc';
            const isSortDown = isSortColumn && order === 'desc';

            const normalizedColumnName
              = columnName[0].toUpperCase() + columnName.slice(1);

            return (
              <th key={columnName}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {normalizedColumnName}

                  <SearchLink params={sortParams(columnName) as SearchParams}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': !isSortColumn,
                          'fa-sort-up': isSortUp,
                          'fa-sort-down': isSortDown,
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
        {people.map((person) => {
          const {
            sex, born, died, fatherName, motherName, slug,
          } = person;
          const mother = people.find((woman) => woman.name === motherName);

          const father = people.find((man) => man.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={cn({ 'has-background-warning': slug === personSlug })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother ? <PersonLink person={mother} /> : motherName || '-'}
              </td>

              <td>
                {father ? <PersonLink person={father} /> : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
