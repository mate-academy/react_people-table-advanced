import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from './Person';
import { SearchLink } from './SearchLink';

import { Person as PersonType, SortBy } from '../types';

type Props = {
  people: PersonType[];
};
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort');
  const order = searchParams.get('order');

  const sorts = Object.entries(SortBy);

  const getParams = (
    currentSortBy: string | null,
    currentOrder: string | null,
    value: string,
  ) => {
    if (currentSortBy !== value || !sortBy) {
      return { sort: value, order: null };
    }

    if (currentSortBy === value && !currentOrder) {
      return { sort: value, order: 'desc' };
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
          {sorts.map(([key, value]) => (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {key}
                <SearchLink params={getParams(sortBy, order, value)}>
                  <span className="icon">
                    <i
                      className={cn('fas', {
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
          <Person person={person} key={person.name} search={searchParams} />
        ))}
      </tbody>
    </table>
  );
};
