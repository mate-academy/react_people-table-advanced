/* eslint-disable max-len */
import cn from 'classnames';
import { Person } from '../types';
import { PeopleRow } from './PeopleRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
  slug?: string;
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  slug,
  searchParams,
}) => {
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const sortBy = (name: string) => {
    if (!currentSort) {
      return { sort: name, order: null };
    }

    if (currentSort === name && !currentOrder) {
      return { sort: name, order: 'desc' };
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
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink
                params={sortBy('name')}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': currentSort === 'name' && !currentOrder,
                    'fa-sort-down': currentOrder === 'desc' && currentSort === 'name',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={sortBy('sex')}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': currentSort === 'sex' && !currentOrder,
                    'fa-sort-down': currentOrder === 'desc' && currentSort === 'sex',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={sortBy('born')}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': currentSort === 'born' && !currentOrder,
                    'fa-sort-down': currentOrder === 'desc' && currentSort === 'born',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={sortBy('died')}
              >
                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': currentSort === 'died' && !currentOrder,
                    'fa-sort-down': currentOrder === 'desc' && currentSort === 'died',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PeopleRow
            person={person}
            key={person.slug}
            slug={slug}
          />
        ))}

      </tbody>
    </table>
  );
};
