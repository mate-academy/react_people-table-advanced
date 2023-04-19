import { FC } from 'react';
import classNames from 'classnames';
import { PersonInfo } from '../PersonInfo';
import { Person, SortType } from '../../types';
import { SearchLink } from '../SearchLink';

type Props = {
  people: Person[],
  sort: string | null,
  order: string | null,
};

export const PeopleTable: FC<Props> = ({
  people,
  sort,
  order,
}) => {
  const changeSorting = (
    prevSortType: string | null,
    field: SortType,
    prevOrder: string | null,
  ) => {
    if (prevSortType === field && !prevOrder) {
      return { sort: prevSortType, order: 'desc' };
    }

    if (prevSortType === field && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
  };

  const sortingClassNames = (
    currSort: string | null,
    field: SortType,
    currOrder: string | null,
  ) => ({
    'fa-sort': currSort !== field,
    'fa-sort-up': currSort === field && !currOrder,
    'fa-sort-down': currSort === field && currOrder === 'desc',
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {Object.values(SortType).map(field => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.slice(0, 1).toUpperCase() + field.slice(1)}

                <SearchLink
                  params={changeSorting(sort, field, order)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'fas',
                      sortingClassNames(sort, field, order),
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
        {people.map(person => {
          return (
            <PersonInfo
              key={person.slug}
              person={person}
            />
          );
        })}
      </tbody>
    </table>
  );
};
