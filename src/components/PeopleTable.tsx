/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { SearchLink } from './SearchLink';
import { SortType } from '../enums/SortType';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const filteredPeople = useMemo(() => {
    let result = [...people];

    if (sort) {
      result.sort((a, b) => {
        if (sort === SortType.name) {
          return order === 'desc'
            ? b.name.localeCompare(a.name)
            : a.name.localeCompare(b.name);
        }

        if (sort === SortType.sex) {
          return order === 'desc'
            ? b.sex.localeCompare(a.sex)
            : a.sex.localeCompare(b.sex);
        }

        if (sort === SortType.born) {
          return order === 'desc' ? b.born - a.born : a.born - b.born;
        }

        if (sort === SortType.died) {
          return order === 'desc' ? b.died - a.died : a.died - b.died;
        }

        return 0;
      });
    }

    if (sex) {
      result = result.filter(person => person.sex === sex);
    }

    if (query) {
      result = result.filter(person =>
        person.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    if (centuries.length > 0) {
      result = result.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      );
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, order, sex, query, centuries]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      {filteredPeople.length === 0 ? (
        <p>There are no people matching the current search criteria</p>
      ) : (
        <>
          <thead>
            <tr>
              {Object.values(SortType).map(type => {
                return (
                  <th key={type}>
                    <span className="is-flex is-flex-wrap-nowrap">
                      {type[0].toUpperCase() + type.slice(1)}
                      <SearchLink
                        params={{
                          sort: sort === type && order ? null : type,
                          order: sort === type ? (order ? null : 'desc') : null,
                        }}
                      >
                        <span className="icon">
                          <i
                            className={classNames('fas', {
                              'fa-sort': sort !== type,
                              'fa-sort-up': sort === type && !order,
                              'fa-sort-down': sort === type && order,
                            })}
                          />
                        </span>
                      </SearchLink>
                    </span>
                  </th>
                );
              })}

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {filteredPeople.map(person => (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames('', {
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <Link
                    to={{
                      pathname: `/people/${person.slug}`,
                      search: searchParams.toString(),
                    }}
                    className={classNames('', {
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>

                {person.motherName ? (
                  people.find(human => human.name === person.motherName) ? (
                    <td>
                      <Link
                        className="has-text-danger"
                        to={{
                          pathname: `/people/${people.find(human => human.name === person.motherName)?.slug}`,
                          search: searchParams.toString(),
                        }}
                      >
                        {person.motherName}
                      </Link>
                    </td>
                  ) : (
                    <td>{person.motherName}</td>
                  )
                ) : (
                  <td>-</td>
                )}

                {person.fatherName ? (
                  people.find(human => human.name === person.fatherName) ? (
                    <td>
                      <Link
                        to={{
                          pathname: `/people/${people.find(human => human.name === person.fatherName)?.slug}`,
                          search: searchParams.toString(),
                        }}
                      >
                        {person.fatherName}
                      </Link>
                    </td>
                  ) : (
                    <td>{person.fatherName}</td>
                  )
                ) : (
                  <td>-</td>
                )}
              </tr>
            ))}
          </tbody>
        </>
      )}
    </table>
  );
};
