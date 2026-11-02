
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedPerson: Person | null;
  onSelectPerson: (person: Person) => void;
  sort: string;
  order: string;
  onSort: (field: string) => void;
};

export const PeopleTable = ({
  people,
  selectedPerson,
  onSelectPerson,
  sort,
  order,
  onSort,
}: Props) => {
  const getArrow = (field: string) => {
    if (sort !== field) {
      return '↕';
    }

    return order === 'desc' ? '↓' : '↑';
  };

  const getClassName = (field: string) => {
    return sort === field ? 'has-text-weight-bold' : '';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th
            className={getClassName('name')}
            onClick={() => onSort('name')}
          >
            Name {getArrow('name')}
          </th>

          <th
            className={getClassName('sex')}
            onClick={() => onSort('sex')}
          >
            Sex {getArrow('sex')}
          </th>

          <th
            className={getClassName('born')}
            onClick={() => onSort('born')}
          >
            Born {getArrow('born')}
          </th>

          <th
            className={getClassName('died')}
            onClick={() => onSort('died')}
          >
            Died {getArrow('died')}
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={
              selectedPerson?.slug === person.slug
                ? 'has-background-warning-light'
                : ''
            }
            onClick={() => onSelectPerson(person)}
          >
            <td>
              {person.name}
            </td>

            <td>{person.sex}</td>

            <td>{person.born}</td>

            <td>{person.died}</td>

            <td>
              {person.mother ? (
                <a
                  href={`#/people/${person.mother.slug}`}
                  className="has-text-danger"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {person.mother.name}
                </a>
              ) : (
                '-'
              )}
            </td>

            <td>
              {person.father ? (
                <a
                  href={`#/people/${person.father.slug}`}
                  className="has-text-link"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  {person.father.name}
                </a>
              ) : (
                '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
