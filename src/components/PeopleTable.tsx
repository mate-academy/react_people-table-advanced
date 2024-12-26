import { NavLink, useParams } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { Sex } from '../types';

interface Props {
  people: Person[];
}
export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;

  const peopleWithParents = people.map(person => {
    const mother = people.find(mom => mom.name === person.motherName) || null;
    const father = people.find(dad => dad.name === person.fatherName) || null;

    return { ...person, mother, father };
  });
  const isInTheList = (name: string | null) => {
    if (name === null) {
      return false;
    }

    return people.some(person => person.name === name);
  };

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
                  <i className="fas fa-sort" />
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
        {peopleWithParents.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({ 'has-background-warning': person.slug === slug })}
          >
            <td>
              <NavLink
                className={cn({
                  'has-text-danger': person.sex === Sex.Female,
                })}
                to={`${person.slug}`}
              >
                {person.name}
              </NavLink>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {isInTheList(person.motherName) ? (
                <NavLink
                  to={`${person.mother?.slug}`}
                  className={'has-text-danger'}
                >
                  {person.motherName}
                </NavLink>
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {isInTheList(person.fatherName) ? (
                <NavLink to={`${person.father?.slug}`}>
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
