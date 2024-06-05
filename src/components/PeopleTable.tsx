import { PersonLink } from './PersonLink';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  filteredPeople: Person[];
  persons: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ filteredPeople, persons }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const sortFields = ['name', 'sex', 'born', 'died'];

  const handleSort = (currentSort: string) => {
    if (currentSort !== sortBy) {
      return {
        sort: currentSort,
        order: null,
      };
    }

    if (currentSort === sortBy && !sortOrder) {
      return {
        sort: currentSort,
        order: 'desc',
      };
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
          {sortFields.map(sortField => {
            return (
              <th key={sortField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortField[0].toUpperCase() + sortField.slice(1)}
                  <SearchLink params={handleSort(sortField)}>
                    <span className="icon">
                      <i
                        className={classNames('fas', {
                          'fa-sort': sortBy !== sortField,
                          'fa-sort-up': sortBy === sortField && !sortOrder,
                          'fa-sort-down': sortBy === sortField && sortOrder,
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
        {filteredPeople.map(person => (
          <PersonLink person={person} persons={persons} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
