/* eslint-disable jsx-a11y/control-has-associated-label */
import { Person } from '../types';
import PersonLink from './components/PersonLink';
import { useParams } from 'react-router-dom';

interface PeopleTableProps {
  database: Person[];
}
export const PeopleTable = ({ database }: PeopleTableProps) => {
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
        {database.map(person => {
          const mom = database.find(p => p.name === person.motherName);
          const dad = database.find(p => p.name === person.fatherName);

          return (
            <tr
              className={slug === person.slug ? 'has-background-warning' : ''}
              data-cy="person"
              key={person.slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mom ? <PersonLink person={mom} /> : person.motherName || '-'}
              </td>

              <td>
                {dad ? <PersonLink person={dad} /> : person.fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
