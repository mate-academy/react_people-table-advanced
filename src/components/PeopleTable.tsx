import {
  FC,
  ReactElement,
  ReactEventHandler,
  useEffect,
  useState,
} from 'react';
import { Person } from '../types';
import { Link, NavLink, useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SortName, SortOrder } from '../types/SortTypes';

type Props = {
  people: Person[];
  sortedPeople: (sortName: SortName, sortOrder: SortOrder) => void;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: FC<Props> = ({ people, sortedPeople = () => {} }) => {
  const [searchParams, setearchParams] = useSearchParams();

  const [sortName, setSortName] = useState<SortName>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('');

  const handleSort = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const sortEventName = event.currentTarget.dataset.sort;

    if (sortEventName !== sortName) {
      setSortName(sortEventName as SortName);
      setSortOrder('asc');
      sortedPeople(sortName, sortOrder);
    }
    if (sortEventName === sortName && sortOrder === 'asc') {
      setSortOrder('desc');
      sortedPeople(sortName, sortOrder);
      getSearchWith(searchParams, { order: 'desc' });
    }
    if (sortEventName === sortName && sortOrder === 'desc') {
      setSortOrder('');
      setSortName('');
      getSearchWith(searchParams, { order: '' });
      sortedPeople(sortName, sortOrder);
    }
  };

  useEffect(() => {
    getSearchWith(searchParams, { sort: sortName });
  }, [searchParams]);

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
                data-sort="name"
                onClick={handleSort}
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
                data-sort="sex"
                onClick={handleSort}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortOrder === '' && sortName !== 'sex',
                      'fa-sort-up': sortOrder === 'asc' && sortName === 'sex',
                      'fa-sort-down':
                        sortOrder === 'desc' && sortName === 'sex',
                    })}
                  />
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
                data-sort="born"
                onClick={handleSort}
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
              <Link
                to={{
                  search: getSearchWith(searchParams, { sort: 'died' }),
                }}
                data-sort="died"
                onClick={handleSort}
              >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </Link>
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
