import { FC, useState } from 'react';
import { Person } from '../types';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const [sortName, setSortName] = useState<string>('');
  const [sortOrder, setSortOrder] = useState('');

  const filterderPeople = (people: Person[], sort, order: string = '') => {
    if (sort) {
      const sortedPeople = [...people].sort((a, b) => {
        if (sort === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sort === 'born') {
          return a.born - b.born;
        } else if (sort === 'died') {
          return a.died - b.died;
        }
        return 0;
      });

      if (order === 'desc') {
        sortedPeople.reverse();
      }

      return sortedPeople;
    }
    return people;
  };

  const sortPeople = (people: Person[]) => {
    if (searchParams.get('sort') !== sortName) {
      setSortName(searchParams.get('sort') || '');
      // filterderPeople(people);
    }
    if (searchParams.get('sort') === sortName && sortName === '') {
      setSortOrder(searchParams.get('order') || '');
    }
    if (searchParams.get('sort') === sortName && sortName === 'desc') {
      setSortOrder('');
      setSortName('');
      return people;
    }

    setSortName(prevSortName => {
      if (!prevSortName) {
        return searchParams.get('sort') || '';
      }
      if (prevSortName !== sortName) {
        setOrderFlag(false);
        setSortOrder('');
        return searchParams.get('sort') || '';
      }
      if (prevSortName === sortName && !orderFlag) {
        setOrderFlag(true);
        setSortOrder('desc');
      }
      if (prevSortName === sortName && orderFlag) {
        setOrderFlag(false);
        setSortOrder('');
        setSortName('');
      }

      return '';
    });

    const sortedPeople = [...people].sort((a, b) => {
      if (sortName === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortName === 'born') {
        return a.born - b.born;
      } else if (sortName === 'died') {
        return a.died - b.died;
      }
      return 0;
    });

    if (sortOrder === 'desc') {
      sortedPeople.reverse();
    }

    return sortedPeople;
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
              <Link
                to={{
                  search: getSearchWith(searchParams, { sort: 'name' }),
                }}
                onClick={() => {
                  setSortName(searchParams.get('sort') || '');
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  search: getSearchWith(searchParams, { sort: 'sex' }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  search: getSearchWith(searchParams, { sort: 'born' }),
                }}
              >
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=died">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} key={person.slug} />
        ))}
      </tbody>
    </table>
  );
};
