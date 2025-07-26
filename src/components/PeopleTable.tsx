import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[] | undefined;
  slug: string | undefined;
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable = ({ people, slug }: Props) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people?.map(p => {
          const father = people.find(person => person.name === p.fatherName);
          const mother = people.find(person => person.name === p.motherName);

          return (
            <tr
              key={p.slug}
              data-cy="person"
              className={slug === p.slug ? 'has-background-warning' : ''}
            >
              <td>
                {p.sex === 'f' ? (
                  <Link to={`/people/${p.slug}`} className="has-text-danger">
                    {p.name}
                  </Link>
                ) : (
                  <Link to={`/people/${p.slug}`}>{p.name}</Link>
                )}
              </td>

              <td>{p.sex}</td>
              <td>{p.born}</td>
              <td>{p.died}</td>

              <td>
                {!p.motherName ? (
                  '-'
                ) : mother ? (
                  <Link
                    className="has-text-danger"
                    to={`/people/${mother.slug}`}
                  >
                    {p.motherName}
                  </Link>
                ) : (
                  p.motherName
                )}
              </td>

              <td>
                {!p.fatherName ? (
                  '-'
                ) : father ? (
                  <Link to={`/people/${father.slug}`}>{p.fatherName}</Link>
                ) : (
                  p.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
