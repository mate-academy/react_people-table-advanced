import { useParams } from 'react-router-dom';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink/PersonLink';
import classNames from 'classnames';

interface Props {
  people: Person[] | null;
  filteredPeople: Person[] | null;
}

export const PeopleTable: React.FC<Props> = ({ people, filteredPeople }) => {
  const { slug } = useParams();

  const findParent = (name: string | null) => {
    if (name === null) {
      return;
    }

    const normalizedParentName = name.toLowerCase().replaceAll(' ', '-');

    const parent = filteredPeople?.find(person => {
      const normalizedPersonName = person.name
        .toLowerCase()
        .replaceAll(' ', '-');

      return normalizedPersonName === normalizedParentName;
    });

    return parent;
  };

  return people && people.length > 0 ? (
    filteredPeople && filteredPeople.length > 0 ? (
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
          {filteredPeople.map(person => {
            const mother = findParent(person.motherName);
            const father = findParent(person.fatherName);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': person.slug === slug,
                })}
              >
                <td>
                  <PersonLink person={person} />
                  {/* <Link to={`/people/${person.slug}`}>{person.name}</Link> */}
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {mother ? (
                    <PersonLink person={mother} />
                  ) : person.motherName ? (
                    person.motherName
                  ) : (
                    '-'
                  )}
                </td>
                <td>
                  {father ? (
                    <PersonLink person={father} />
                  ) : person.fatherName ? (
                    person.fatherName
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <p>There are no people matching the current search criteria</p>
    )
  ) : (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  );
};

{
  /* <p data-cy="noPeopleMessage">There are no people on the server</p> */
}
