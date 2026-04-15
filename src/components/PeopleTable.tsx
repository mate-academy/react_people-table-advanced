/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedPerson: Person | null;
  onSelect: (person: Person) => void;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  selectedPerson,
  onSelect,
}) => {
  const [searchParams] = useSearchParams();

  const search = searchParams.toString();
  const searchStr = search ? `?${search}` : '';

  const getNameClass = (sex: string) =>
    sex === 'f' ? 'has-text-danger' : 'has-text-link';

  const buildTo = (slug: string) => ({
    pathname: `/people/${slug}`,
    search: searchStr,
  });

  return (
    <table className="table is-fullwidth" data-cy="peopleTable">
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
          const isSelected = selectedPerson?.slug === person.slug;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
              onClick={() => onSelect(person)}
            >
              {/* NAME */}
              <td>
                <Link
                  to={buildTo(person.slug)}
                  className={getNameClass(person.sex)}
                  data-cy="personName"
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              {/* MOTHER */}
              <td>
                {person.motherName ? (
                  people.find(p => p.name === person.motherName) ? (
                    <Link
                      to={buildTo(
                        people.find(p => p.name === person.motherName)!.slug,
                      )}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              {/* FATHER */}
              <td>
                {person.fatherName ? (
                  people.find(p => p.name === person.fatherName) ? (
                    <Link
                      to={buildTo(
                        people.find(p => p.name === person.fatherName)!.slug,
                      )}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
