import { NavLink, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';

/* eslint-disable jsx-a11y/control-has-associated-label */

interface PersonRowProps {
  person: Person;
}

const PersonRow = ({ person }: PersonRowProps) => {
  const { slug } = useParams();
  const location = useLocation();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <NavLink
          to={{ pathname: `/people/${person.slug}`, search: location.search }}
          end
          className={person.sex === 'f' ? 'has-text-danger' : ' '}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          person.mother ? (
            <NavLink
              to={{
                pathname: `/people/${person.mother.slug}`,
                search: location.search,
              }}
              end
              className={person.sex === 'f' ? ' ' : 'has-text-danger'}
            >
              {person.motherName}
            </NavLink>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          person.father ? (
            <NavLink
              className={person.sex === 'f' ? 'has-text-danger' : ' '}
              to={{
                pathname: `/people/${person.father.slug}`,
                search: location.search,
              }}
              end
            >
              {person.fatherName}
            </NavLink>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};

interface Props {
  people: Person[];
}

export const PeopleTable = ({ people }: Props) => {
  const enrichedPeople = people.map(person => {
    return {
      ...person,
      mother: people.find(p => p.name === person.motherName),
      father: people.find(p => p.name === person.fatherName),
    };
  });

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
        {enrichedPeople.map(person => {
          return <PersonRow key={person.slug} person={person} />;
        })}
      </tbody>
    </table>
  );
};
