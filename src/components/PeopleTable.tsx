import { useContext } from 'react';
import { PersonLink } from './PersonLink/PersonLink';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { StateContext } from '../GlobalProvider';

export const PeopleTable = () => {
  const { visiblePeopleList } = useContext(StateContext);
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const toggleSort = (cr: string) => {
    if (sort === '') {
      return { sort: cr, order: null };
    }

    if (sort === cr && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === cr) {
      return { sort: cr, order: 'desc' };
    }

    return { sort: cr, order: null };
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
              <SearchLink params={toggleSort('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && order !== 'desc',
                      'fa-sort-down': sort === 'name' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={toggleSort('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && order !== 'desc',
                      'fa-sort-down': sort === 'sex' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={toggleSort('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && order !== 'desc',
                      'fa-sort-down': sort === 'born' && order === 'desc',
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={toggleSort('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && order !== 'desc',
                      'fa-sort-down': sort === 'died' && order === 'desc',
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
        {visiblePeopleList.map(person => (
          <PersonLink person={person} key={person.name} />
        ))}
      </tbody>
    </table>
  );
};
