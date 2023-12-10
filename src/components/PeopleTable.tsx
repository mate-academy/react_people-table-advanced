import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { PeopleList } from './PeopleList';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  function sortByTable(sortBy: string): SearchParams {
    if (sort !== sortBy && !order) {
      return (
        { sort: sortBy }
      );
    }

    if (sort === sortBy && order === '') {
      return ({
        sort: sortBy,
        order: 'desc',
      });
    }

    return ({
      sort: null,
      order: null,
    });
  }

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
                params={sortByTable('name')}
              >
                <span className="icon">
                  <i
                    className={cn('fas',
                      { 'fa-sort': sort !== 'name' },
                      { 'fa-sort-up': sort === 'name' && !order },
                      { 'fa-sort-down': sort === 'name' && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={sortByTable('sex')}
              >
                <span className="icon">
                  <i
                    className={cn('fas',
                      { 'fa-sort': sort !== 'sex' },
                      { 'fa-sort-up': sort === 'sex' && !order },
                      { 'fa-sort-down': sort === 'sex' && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={sortByTable('born')}
              >
                <span className="icon">
                  <i
                    className={cn('fas',
                      { 'fa-sort': sort !== 'born' },
                      { 'fa-sort-up': sort === 'born' && !order },
                      { 'fa-sort-down': sort === 'born' && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={sortByTable('died')}
              >
                <span className="icon">
                  <i
                    className={cn('fas',
                      { 'fa-sort': sort !== 'died' },
                      { 'fa-sort-up': sort === 'died' && !order },
                      { 'fa-sort-down': sort === 'died' && order === 'desc' })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <PeopleList />
    </table>
  );
};
