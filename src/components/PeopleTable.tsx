import classNames from 'classnames';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SortBy } from '../types/SortBy';
import { filterPeople } from '../utils/filterPeople';
import { sortPeople } from '../utils/sortPeople';
import { PersonItem } from './PersonItem';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({
  people,
}) => {
  const [searchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sortBy = searchParams.get('sort') as keyof SortBy;
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    return filterPeople(
      people,
      sex,
      query,
      centuries,
    );
  }, [people, sex, query, centuries]);

  const sortedPeople = useMemo(() => {
    return sortPeople({
      filteredPeople,
      sortBy,
      order,
    });
  }, [filteredPeople, sortBy, order]);

  const onSort = (sortName: keyof SortBy) => {
    if (sortBy !== sortName) {
      return { sort: sortName, order: null };
    }

    if (sortBy === sortName && !order) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  if (!filteredPeople.length) {
    return <p>There are no people matching the current search criteria</p>;
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

              <SearchLink params={onSort('name')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortBy !== 'name',
                    'fa-sort-up': sortBy === 'name' && !order,
                    'fa-sort-down': sortBy === 'name' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={onSort('sex')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortBy !== 'sex',
                    'fa-sort-up': sortBy === 'sex' && !order,
                    'fa-sort-down': sortBy === 'sex' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={onSort('born')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortBy !== 'born',
                    'fa-sort-up': sortBy === 'born' && !order,
                    'fa-sort-down': sortBy === 'born' && order,
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={onSort('died')}>
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sortBy !== 'died',
                    'fa-sort-up': sortBy === 'died' && !order,
                    'fa-sort-down': sortBy === 'died' && order,
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
        {sortedPeople.map(person => (
          <PersonItem
            key={person.slug}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
