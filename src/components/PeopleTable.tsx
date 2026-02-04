/* eslint-disable jsx-a11y/control-has-associated-label */

import { User } from './PeoplePage';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

interface Props {
  users: User[];
}

export const PeopleTable: React.FC<Props> = ({ users }) => {
  const { slug } = useParams();

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a href="#/people?sort=sex">
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=born&amp;order=desc">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
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
