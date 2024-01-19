import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

interface PeopleTableProps {
  people: Person[],
}

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = (props: PeopleTableProps) => {
  const { people } = props;
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
        {people.map(person => (
          <>
            <tr
              className={classNames({
                'has-background-warning': slug === person.slug,
              })}
              data-cy="person"
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
                {person.mother
                  ? (
                    <Link
                      to={`/people/${person.mother?.slug}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  )
                  : person.motherName}
                {!person.motherName && '-'}
              </td>
              <td>
                {person.father
                  ? (
                    <Link
                      to={`/people/${person.father?.slug}`}
                    >
                      {person.fatherName}
                    </Link>
                  )
                  : person.fatherName}
                {!person.fatherName && '-'}
              </td>
            </tr>
          </>
        ))}

      </tbody>
    </table>
  );
};
