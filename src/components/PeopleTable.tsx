import { useSearchParams, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const selectedSlug = location.pathname.split('/').pop();

  const findPersonByName = (name?: string) => {
    return people.find(p => p.name === name);
  };

  return (
    <table
      className="table is-striped is-hoverable is-fullwidth"
      data-cy="peopleTable"
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
          const motherName = person.motherName;
          const fatherName = person.fatherName;
          const mother = motherName ? findPersonByName(motherName) : undefined;
          const father = fatherName ? findPersonByName(fatherName) : undefined;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedSlug === person.slug,
              })}
            >
              <td>
                <SearchLink
                  pathname={person.slug}
                  params={Object.fromEntries(searchParams.entries())}
                  className={person.sex === 'f' ? 'has-text-danger' : undefined}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {motherName == null ? (
                  '-'
                ) : mother ? (
                  <SearchLink
                    pathname={mother.slug}
                    params={Object.fromEntries(searchParams.entries())}
                    className={
                      mother.sex === 'f' ? 'has-text-danger' : undefined
                    }
                  >
                    {mother.name}
                  </SearchLink>
                ) : (
                  motherName
                )}
              </td>
              <td>
                {fatherName == null ? (
                  '-'
                ) : father ? (
                  <SearchLink
                    pathname={father.slug}
                    params={Object.fromEntries(searchParams.entries())}
                    className={
                      father.sex === 'f' ? 'has-text-danger' : undefined
                    }
                  >
                    {father.name}
                  </SearchLink>
                ) : (
                  fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
