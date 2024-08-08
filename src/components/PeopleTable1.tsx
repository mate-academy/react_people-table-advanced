import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { FC } from 'react';

interface Props {
  slug: string | undefined;
  loading: boolean;
  people: Person[];
}

export const PeopleTable1: FC<Props> = ({ slug, loading, people }) => {
  return (
    <>
      {!!people.length && !loading && (
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
            {people.map(person => {
              const mother = people.find(per => per.name === person.motherName);
              const father = people.find(per => per.name === person.fatherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={cn({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      to={`/people/${person.slug}`}
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
                    {mother ? (
                      <Link
                        to={`/people/${mother.slug}`}
                        className="has-text-danger"
                      >
                        {person.motherName}
                      </Link>
                    ) : (
                      person.motherName || '-'
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link to={`/people/${father.slug}`}>
                        {person.fatherName}
                      </Link>
                    ) : (
                      person.fatherName || '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
