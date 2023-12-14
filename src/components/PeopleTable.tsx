/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SortParams } from '../types/SortParams';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleParams = (params: SortParams) => {
    if (sort !== params) {
      return { sort: params, order: null };
    }

    if (sort === params && order !== 'desc') {
      return { order: 'desc' };
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
                params={handleParams(SortParams.Name) as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortParams.Name,
                    'fa-sort-up': sort === SortParams.Name && !order,
                    'fa-sort-down': sort === SortParams.Name && order,
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
                params={handleParams(SortParams.Sex) as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortParams.Sex,
                    'fa-sort-up': sort === SortParams.Sex && !order,
                    'fa-sort-down': sort === SortParams.Sex && order,
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
                params={handleParams(SortParams.Born) as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortParams.Born,
                    'fa-sort-up': sort === SortParams.Born && !order,
                    'fa-sort-down': sort === SortParams.Born && order,
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
                params={handleParams(SortParams.Died) as SearchParams}
              >
                <span className="icon">
                  <i className={cn('fas', {
                    'fa-sort': sort !== SortParams.Died,
                    'fa-sort-up': sort === SortParams.Died && !order,
                    'fa-sort-down': sort === SortParams.Died && order,
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
        {people
          .map(person => (<PersonLink person={person} key={person.slug} />))}
      </tbody>
    </table>
  );
};
