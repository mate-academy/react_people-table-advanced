import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useEffect, useState } from 'react';
import { useSortIcons } from '../utils/hooks/useSortIcons';
import { getCentury } from '../utils/getCentury';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface Props {
  peopleFromServer: Person[];
}

export const PeopleTable: React.FC<Props> = ({ peopleFromServer }) => {
  const [sortedList, setSortedList] = useState<Person[]>(peopleFromServer);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const sortParam = searchParams.get('sort');
  const orderParam = searchParams.get('order');

  const sortClasses = useSortIcons({
    sortParam,
    orderParam,
  });

  function addSortParams(sortBy: string) {
    const search = new URLSearchParams(searchParams);

    if (search.get('sort') !== sortBy) {
      search.set('sort', sortBy);
      search.delete('order');
    } else if (!search.has('order')) {
      search.set('order', 'desc');
    } else {
      search.delete('sort');
      search.delete('order');
    }

    return search.toString();
  }

  useEffect(() => {
    let sorted = [...peopleFromServer];

    switch (sortParam) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'sex':
        sorted.sort((a, b) => {
          if (a.sex === 'm' && b.sex === 'f') {
            return -1;
          }

          if (a.sex === 'f' && b.sex === 'm') {
            return 1;
          }

          return 0;
        });
        break;
      case 'born':
        sorted.sort((a, b) => a.born - b.born);
        break;
      case 'died':
        sorted.sort((a, b) => a.died - b.died);
        break;
      default:
        sorted = [...peopleFromServer];
    }

    if (orderParam === 'desc') {
      sorted.reverse();
    }

    setSortedList(sorted);
  }, [peopleFromServer, searchParams, orderParam, sortParam]);

  useEffect(() => {
    const sexParam = searchParams.get('sex');
    const queryParam = searchParams.get('query');
    const centuryParams = searchParams.getAll('centuries').map(d => +d);

    if (sexParam) {
      setSortedList(curr => curr.filter(person => person.sex === sexParam));
    }

    if (queryParam) {
      setSortedList(curr =>
        curr.filter(
          person =>
            person.name.includes(queryParam) ||
            person.motherName?.includes(queryParam) ||
            person.fatherName?.includes(queryParam),
        ),
      );
    }

    if (centuryParams.length > 0) {
      setSortedList(curr =>
        curr.filter(pers => {
          const persCentury = getCentury(pers.born);

          return centuryParams.includes(persCentury);
        }),
      );
    }
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
                  pathname: location.pathname,
                  search: addSortParams('name'),
                }}
              >
                <span className="icon">
                  <i className={sortClasses.name} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link
                to={{
                  pathname: location.pathname,
                  search: addSortParams('sex'),
                }}
              >
                <span className="icon">
                  <i className={sortClasses.sex} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link
                to={{
                  pathname: location.pathname,
                  search: addSortParams('born'),
                }}
              >
                <span className="icon">
                  <i className={sortClasses.born} />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link
                to={{
                  pathname: location.pathname,
                  search: addSortParams('died'),
                }}
              >
                <span className="icon">
                  <i className={sortClasses.died} />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedList.map(person => {
          return (
            <PersonLink
              people={peopleFromServer}
              person={person}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
