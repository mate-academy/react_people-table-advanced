import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';
import { PersonInfo } from '../PersonInfo';
import { PeopleContext } from '../../store/PeopleContext';
import { SearchLink } from '../SearchLink';
import { SearchParams } from '../../utils/searchHelper';

export const PeopleTable = () => {
  const [searchParams] = useSearchParams();
  const { visiblePeople } = useContext(PeopleContext);

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const setSortParams = (field: string): SearchParams => {
    if (sort === field && order) {
      return { sort: null, order: null };
    }

    if (sort === field) {
      return { order: 'desc' };
    }

    return { sort: field, order: null };
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
              <SearchLink params={setSortParams('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span
              className="is-flex is-flex-wrap-nowrap"
            >
              Sex
              <SearchLink params={setSortParams('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={setSortParams('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={setSortParams('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
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
        {visiblePeople.map(person => (
          <PersonInfo key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
