import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleLink } from './PeopleLink';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { useMemo } from 'react';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || 'asc';

  const visiblePeople = useMemo(() => {
    if (!sort) {
      return people;
    }

    const sorted = [...people].sort((person1, person2) => {
      let result = 0;

      if (sort === 'name' || sort === 'sex') {
        result = person1[sort].localeCompare(person2[sort]);
      } else if (sort === 'born' || sort === 'died') {
        result = person1[sort] - person2[sort];
      }

      return order === 'desc' ? -result : result;
    });

    return sorted;
  }, [people, sort, order]);

  const getNextSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
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
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(
                    searchParams,
                    getNextSortParams('name'),
                  ),
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
                  pathname: '/people',
                  search: getSearchWith(searchParams, getNextSortParams('sex')),
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
                  pathname: '/people',
                  search: getSearchWith(
                    searchParams,
                    getNextSortParams('born'),
                  ),
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
              Died
              <Link
                to={{
                  pathname: '/people',
                  search: getSearchWith(
                    searchParams,
                    getNextSortParams('died'),
                  ),
                }}
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
        {visiblePeople.map(person => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              key={person.name}
            >
              <td>
                <PeopleLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PeopleLink person={mother} />
                ) : (
                  person.motherName
                )}
              </td>
              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PeopleLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
