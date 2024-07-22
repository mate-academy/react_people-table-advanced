import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleTableProps } from './types';

/* eslint-disable jsx-a11y/control-has-associated-label */

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { personId } = useParams();
  const selectedPersonId = personId ? personId : '';

  const [searchParams, setSearchParams] = useSearchParams();
  const filterSort = searchParams.get('sort') || '';
  const filterOrder = searchParams.get('order') || '';

  const handleProcedure = (sort: string) => {
    const params = new URLSearchParams(searchParams);

    if (filterSort === '' && filterOrder === '') {
      params.set('sort', sort);
      setSearchParams(params);
    } else if (filterSort === sort && filterOrder === '') {
      params.set('order', 'desc');
      setSearchParams(params);
    } else if (filterSort === sort && filterOrder === 'desc') {
      params.delete('sort');
      setSearchParams(params);
      params.delete('order');
      setSearchParams(params);
    } else if (filterSort !== '' && filterSort !== sort) {
      params.set('sort', sort);
      setSearchParams(params);
      params.delete('order');
      setSearchParams(params);
    }
  };

  const getSortIconClass = (sort: string, order?: string) => {
    if (sort === filterSort) {
      return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
    }

    return 'fa-sort';
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
              <a
                onClick={() => {
                  handleProcedure('name');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass('name', filterOrder)}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                onClick={() => {
                  handleProcedure('sex');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass('sex', filterOrder)}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                onClick={() => {
                  handleProcedure('born');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass('born', filterOrder)}`}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                onClick={() => {
                  handleProcedure('died');
                }}
              >
                <span className="icon">
                  <i
                    className={`fas ${getSortIconClass('died', filterOrder)}`}
                  />
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
          <tr
            key={person.slug}
            data-cy="person"
            className={classNames({
              'has-background-warning': selectedPersonId === person.slug,
            })}
          >
            <td>
              <NavLink
                to={{
                  pathname: `/people/${person.slug}`,
                  search: searchParams.toString(),
                }}
                className={classNames({
                  'has-text-danger': person.sex === 'f',
                })}
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.mother ? (
                <NavLink
                  to={{
                    pathname: `/people/${person.mother.slug}`,
                    search: searchParams.toString(),
                  }}
                  className="has-text-danger"
                >
                  {person.motherName}
                </NavLink>
              ) : (
                person.motherName || '-'
              )}
            </td>

            <td>
              {person.father ? (
                <NavLink
                  to={{
                    pathname: `/people/${person.father.slug}`,
                    search: searchParams.toString(),
                  }}
                >
                  {person.fatherName}
                </NavLink>
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
