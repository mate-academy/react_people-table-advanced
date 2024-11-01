import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const peopleNames = people.map(person => person.name);
  const location = useLocation();

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
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a href="#/people?sort=name">
                <span className="icon">
                  <i className="fas fa-sort-down" />
                </span>
              </a>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a href="#/people?sort=name">
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
        {people.map(person => {
          const isShe = person.sex === 'f';

          return (
            <tr
              data-cy="person"
              key={person.name}
              className={
                location.pathname ===
                `/people/${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`
                  ? 'has-background-warning'
                  : ''
              }
            >
              <td>
                <Link
                  to={`/people/${person.name.toLowerCase().replaceAll(' ', '-')}-${person.born}`}
                  className={isShe ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {person.motherName && peopleNames.includes(person.motherName) ? (
                <td>
                  <Link
                    to={`/people/${person.motherName.toLowerCase().replaceAll(' ', '-')}-${people.find(body => body.name === person.motherName)?.born}`}
                    className="has-text-danger"
                  >
                    {person.motherName ? person.motherName : '-'}
                  </Link>
                </td>
              ) : (
                <td>{person.motherName ? person.motherName : '-'}</td>
              )}

              {person.fatherName && peopleNames.includes(person.fatherName) ? (
                <td>
                  <Link
                    to={`/people/${person.fatherName.toLowerCase().replaceAll(' ', '-')}-${people.find(body => body.name === person.fatherName)?.born}`}
                  >
                    {person.fatherName ? person.fatherName : '-'}
                  </Link>
                </td>
              ) : (
                <td>{person.fatherName ? person.fatherName : '-'}</td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
