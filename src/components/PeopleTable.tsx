import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type PeopleTableProps = {
  people: Person[]
};

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const motherContent = (person: Person) => {
    if (people.some(p => p.name === person.motherName)) {
      return (
        <Link className="has-text-danger" to={`/people/${people.find(p => p.name === person.motherName)?.slug}?${searchParams?.toString()}`}>
          {person.motherName}
        </Link>
      );
    }

    if (person.motherName) {
      return person.motherName;
    }

    return '-';
  };

  const fatherContent = (person: Person) => {
    if (people.some(p => p.name === person.fatherName)) {
      return (
        <Link to={`/people/${people.find(p => p.name === person.fatherName)?.slug}?${searchParams?.toString()}`}>
          {person.fatherName}
        </Link>
      );
    }

    if (person.fatherName) {
      return person.fatherName;
    }

    return '-';
  };

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
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}?${searchParams?.toString()}`}
                className={cn({
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
              {motherContent(person)}
            </td>
            <td>
              {fatherContent(person)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
