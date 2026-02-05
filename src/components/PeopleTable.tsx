/* eslint-disable jsx-a11y/control-has-associated-label */

import { User } from './PeoplePage';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useParams, useSearchParams } from 'react-router-dom';

interface Props {
  users: User[];
}

export const PeopleTable: React.FC<Props> = ({ users }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortedRow = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  function handleSort(row: string) {
    const params = new URLSearchParams(searchParams);

    if (sortedRow === row) {
      params.set('order', 'desc');
    }

    if (sortedRow === row && sortOrder === 'desc') {
      params.delete('sort');
      params.delete('order');
    }

    if (sortedRow !== row) {
      params.set('sort', row);
      params.delete('order');
    }

    setSearchParams(params);
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
              <a onClick={() => handleSort('name')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedRow !== 'name',
                      'fa-sort-up': sortedRow === 'name' && !sortOrder,
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort('sex')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedRow !== 'sex',
                      'fa-sort-up': sortedRow === 'sex' && !sortOrder,
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort('born')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedRow !== 'born',
                      'fa-sort-up': sortedRow === 'born' && !sortOrder,
                      'fa-sort-down': sortOrder === 'desc',
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort('died')}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sortedRow !== 'died',
                      'fa-sort-up': sortedRow === 'died' && !sortOrder,
                      'fa-sort-down':
                        sortOrder === 'desc' && sortedRow === 'died',
                    })}
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
        {users?.map(user => {
          return (
            <tr
              data-cy="person"
              key={user.slug}
              className={classNames({
                'has-background-warning': slug === user.slug,
              })}
            >
              <td>
                <PersonLink person={user} />
              </td>

              <td>{user.sex}</td>
              <td>{user.born}</td>
              <td>{user.died}</td>
              <td>
                <PersonLink name={user.motherName} people={users} />
              </td>
              <td>
                <PersonLink name={user.fatherName} people={users} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
