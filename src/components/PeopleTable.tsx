import { Person } from './Person';
import { Person as PersonType, SortBy, SortOrder } from '../types';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  people: PersonType[];
  selectedPersonSlug: string | null;
  sortBy: SortBy | null;
  order: SortOrder | null;
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
  sortBy,
  order,
}) => {
  const renderSortIcon = (column: SortBy) => {
    if (sortBy === column) {
      return (
        <span className="icon">
          <i
            className={cn('fas', {
              'fa-sort-up': order === 'asc',
              'fa-sort-down': order === 'desc',
            })}
          />
        </span>
      );
    }

    return (
      <span className="icon">
        <i className="fas fa-sort" />
      </span>
    );
  };

  const getSortParams = (column: SortBy) => {
    let newSortBy: SortBy | null = column;
    let newOrder: SortOrder = 'asc';

    if (sortBy === column) {
      if (order === 'asc') {
        newOrder = 'desc';
      } else {
        newSortBy = null;
        newOrder = null;
      }
    }

    return {
      sort: newSortBy,
      order: newOrder,
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={getSortParams('name')}>
                {renderSortIcon('name')}
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                {renderSortIcon('sex')}
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                {renderSortIcon('born')}
              </SearchLink>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                {renderSortIcon('died')}
              </SearchLink>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Person
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
