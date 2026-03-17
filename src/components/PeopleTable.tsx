/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { useContext } from 'react';
import { PeopleContext } from '../context/PeopleContext';
import { useParams } from 'react-router-dom';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const { personName } = useParams();

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
        {people.map(p => {
          const motherPerson = people.find(
            person => person.name === p.motherName,
          );
          const fatherPerson = people.find(
            person => person.name === p.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={p.name}
              className={classNames({
                'has-background-warning': p.slug === personName,
              })}
            >
              <td>
                <PersonLink person={p} />
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>
              <td>
                {motherPerson ? (
                  <PersonLink person={motherPerson} />
                ) : (
                  p.motherName || '-'
                )}
              </td>
              <td>
                {fatherPerson ? (
                  <PersonLink person={fatherPerson} />
                ) : (
                  p.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
