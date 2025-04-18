/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import { PersonTable } from './PersonTable';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSortToggle = (sortBy: string) => {
    if (!currentSort || currentSort !== sortBy) {
      return { sort: sortBy, order: 'asc' };
    } else if (currentSort === sortBy && currentOrder === 'asc') {
      return { sort: sortBy, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const handleSortOrderClass = (sortField: string) => {
    if (sortField === currentSort && currentOrder === 'asc') {
      return 'fa-sort-up';
    } else if (sortField === currentSort && currentOrder === 'desc') {
      return 'fa-sort-down';
    }

    return 'fa-sort';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(sortField => {
            return (
              <th key={sortField}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {sortField.charAt(0).toUpperCase() + sortField.slice(1)}
                  <SearchLink params={handleSortToggle(sortField)}>
                    <span className="icon">
                      <i
                        className={classNames(
                          'fas',
                          handleSortOrderClass(sortField),
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
        {people.map(person => (
          <PersonTable person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
