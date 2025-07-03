import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  searchParams: URLSearchParams;
};

export const PeopleTable: React.FC<Props> = ({ people, searchParams }) => {
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
        {people.map(person => {
          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={`/people/${person.slug}?${searchParams.toString()}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td className={person.sex === 'f' ? 'has-text-danger' : ''}>
                {person.sex}
              </td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                <PersonLink
                  personName={person.motherName || ''}
                  people={people}
                />
              </td>
              <td>
                <PersonLink
                  personName={person.fatherName || ''}
                  people={people}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
