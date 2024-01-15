/* eslint-disable jsx-a11y/control-has-associated-label */

import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PeopleLink';
import { SearchLink } from './SearchLink';

interface PeopleTableProps {
  visiblePeople: Person[]
  people: Person[]
  personSlug: string | undefined;
}

const SORT_TYPES = [
  'Name',
  'Sex',
  'Born',
  'Died',
];

export const PeopleTable: React.FC<PeopleTableProps> = (
  { visiblePeople, people, personSlug },
) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleChangeSort = (value: string) => {
    if (currentSort !== value) {
      return { sort: value, order: null };
    }

    if (currentSort === value && !currentOrder) {
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
          {SORT_TYPES.map(sortType => (
            <th>
              <span className="is-flex is-flex-wrap-nowrap">
                {sortType}
                <SearchLink params={handleChangeSort(sortType.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={cn('fas',
                        {
                          'fa-sort': currentSort !== sortType.toLowerCase(),
                          'fa-sort-up':
                        currentSort === sortType.toLowerCase()
                        && !currentOrder,
                          'fa-sort-down':
                          currentSort === sortType.toLowerCase()
                          && currentOrder,
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
        {visiblePeople.map(person => (
          <PersonLink person={person} people={people} personSlug={personSlug} />
        ))}
      </tbody>
    </table>
  );
};
