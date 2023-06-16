import classNames from 'classnames';
import { FC } from 'react';
import { Person } from '../types';

import { PersonDetails } from './PersonDetails';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  selectedSlug: string;
  sort: string;
  order: string;
};

const tableColumns = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable:FC<Props> = ({
  people, selectedSlug, sort, order,
}) => {
  const handleSortParams = (columnName: string) => {
    if (sort === columnName && !order) {
      return { sort: columnName, order: 'desc' };
    }

    if (sort === columnName && order) {
      return { sort: null, order: null };
    }

    return { sort: columnName, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {tableColumns.map(columnName => (
            <th key={columnName}>
              <span className="is-flex is-flex-wrap-nowrap">
                {columnName}
                <SearchLink
                  params={handleSortParams(columnName.toLowerCase())}
                >
                  <span className="icon">
                    <i className={classNames('fas fa-sort', {
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
        {people.map(person => (
          <PersonDetails
            people={people}
            person={person}
            key={person.name}
            selectedSlug={selectedSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
