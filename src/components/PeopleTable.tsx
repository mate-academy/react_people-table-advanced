/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonInfo } from './PersonInfo';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  people: Person[]
};

export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sexFilter = searchParams.get('sex');
  const centuryFilter = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (category: string) => {
    let sortingParams: SearchParams = { sort: null, order: null };

    if (sort !== category) {
      sortingParams = { sort: category, order: null };
    }

    if (sort === category && !order) {
      sortingParams = { sort: category, order: 'desc' };
    }

    return sortingParams;
  };

  const visiblePeople = useMemo(() => {
    let newPeople = [...people];

    if (sexFilter) {
      newPeople = newPeople.filter(person => person.sex === sexFilter);
    }

    if (centuryFilter.length) {
      newPeople = newPeople.filter(person => {
        const century = Math.ceil(person.died / 100);

        return centuryFilter.includes(String(century));
      });
    }

    if (query) {
      newPeople = newPeople.filter(person => {
        const lowerQuery = query.toLowerCase();

        return person.name.toLowerCase().includes(lowerQuery)
          || person.motherName?.toLowerCase().includes(lowerQuery)
          || person.fatherName?.toLowerCase().includes(lowerQuery);
      });
    }

    if (sort) {
      newPeople = newPeople.sort((a, b) => {
        switch (sort) {
          case 'name':
          case 'sex':
            return a[sort].localeCompare(b[sort]);
          case 'born':
          case 'died':
            return a[sort] - b[sort];
          default:
            return 0;
        }
      });
    }

    if (order) {
      newPeople = newPeople.reverse();
    }

    return newPeople;
  }, [people, sexFilter, centuryFilter, query, sort, order]);

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
                params={handleSort('name')}
              >
                <span className="icon">
                  <i className={classNames('fas', {
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
              <SearchLink params={handleSort('sex')}>
                <span className="icon">
                  <i className={classNames('fas', {
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
              <SearchLink params={handleSort('born')}>
                <span className="icon">
                  <i className={classNames('fas', {
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
              <SearchLink params={handleSort('died')}>
                <span className="icon">
                  <i className={classNames('fas', {
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
        {visiblePeople?.map(person => (
          <PersonInfo key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
