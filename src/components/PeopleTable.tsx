import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../types/SortBy';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { Person as PersonType } from '../types';
import { Person } from './Person';

type Props = {
  people: PersonType[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order');
  const sortBy = searchParams.get('sort');

  const sortOptions = Object.entries(SortBy);

  const getSortParams = (
    currentSortBy: string | null,
    currentOrder: string | null,
    sortValue: string,
  ) => {
    if (currentSortBy !== sortValue || !sortBy) {
      return { sort: sortValue, order: null };
    }

    if (currentSortBy === sortValue && !currentOrder) {
      return { sort: sortValue, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortOptions.map(([label, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(sortBy, order, value)}>
                  <span className="icon">
                    <i
                      className={classNames('fas', {
                        'fa-sort-up': value === sortBy && !order,
                        'fa-sort-down': value === sortBy && order,
                        'fa-sort': value !== sortBy,
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
          <Person person={person} search={searchParams} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
