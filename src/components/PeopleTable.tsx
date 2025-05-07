import cn from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  people: Person[];
}

function getNormalizedName(person: Person | undefined, name: string | null) {
  if (person && person.sex === 'f') {
    return (
      <Link className="has-text-danger" to={`/people/${person.slug}`}>
        {name}
      </Link>
    );
  }

  if (person && person.sex === 'm') {
    return <Link to={`/people/${person.slug}`}>{name}</Link>;
  }

  return name ?? '-';
}

export default function PeopleTable({ people }: Props) {
  const { slug: slugParams } = useParams();

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
          const {
            name,
            sex,
            slug,
            born,
            died,
            fatherName,
            motherName,
            father,
            mother,
          } = person;

          return (
            <tr
              key={slug}
              data-cy="person"
              className={cn({ 'has-background-warning': slugParams === slug })}
            >
              <td>
                <a
                  href={`#/people/${slug}`}
                  className={cn({ 'has-text-danger': sex === 'f' })}
                >
                  {name}
                </a>
              </td>
              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>{getNormalizedName(mother, motherName)}</td>
              <td>{getNormalizedName(father, fatherName)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
