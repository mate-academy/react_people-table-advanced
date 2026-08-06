/* eslint-disable jsx-a11y/control-has-associated-label */

import { Link } from 'react-router-dom';
import { Person } from '../types/Person';

import classNames from 'classnames';
import { useParams } from 'react-router-dom';

const findPerson = (
  people: Person[],
  name: string | null,
  personObj?: Person,
): Person | null => {
  if (!name && !personObj) {
    return null;
  }

  return (
    people.find(
      p => p.name === name || (personObj && p.slug === personObj.slug),
    ) || null
  );
};

export const PeopleTable = ({ people }: { people: Person[] }) => {
  const { slug } = useParams<{ slug: string }>();

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
        {people.map(person => {
          const motherName = person.motherName || person.mother?.name || null;
          const fatherName = person.fatherName || person.father?.name || null;

          const mother = findPerson(people, motherName, person.mother);
          const father = findPerson(people, fatherName, person.father);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={classNames({
                    'has-text-danger': person.sex === 'f',
                  })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </Link>
                ) : (
                  motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{father.name}</Link>
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
