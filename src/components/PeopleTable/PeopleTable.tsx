import { memo, FC, useCallback } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { SearchLink } from '../SearchLink';

interface Props {
  people: Person[];
  order: string | null;
  sort: string | null;
}

const tableColumn = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: FC<Props> = memo(({ people, order, sort }) => {
  const { selectedPerson = '' } = useParams();

  const handleSortParams = useCallback((columnName: string) => {
    if (columnName === sort && !order) {
      return { sort: columnName, order: 'desc' };
    }

    if (columnName === sort && order) {
      return { sort: null, order: null };
    }

    return { sort: columnName, order: null };
  }, [order, sort]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumn.map(columnName => (
            <th key={columnName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName}
                <SearchLink
                  params={handleSortParams(columnName.toLowerCase())}
                >
                  <span className="icon">
                    <i className={cn('fas fa-sort', {
                      'fa-sort-up': columnName.toLowerCase() === sort
                        && !order,
                      'fa-sort-down': columnName.toLowerCase() === sort
                        && order,
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
        {people.map((person) => (
          <PersonLink
            person={person}
            key={person.slug}
            selectedPerson={selectedPerson}
          />
        ))}
      </tbody>
    </table>
  );
});
