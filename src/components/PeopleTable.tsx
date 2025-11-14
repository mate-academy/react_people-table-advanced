import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  peopleByName: Map<string, Person>;
  onSort: (field: string) => void;
  sortField: string | null;
  order: string | null;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  peopleByName,
  onSort,
  sortField,
  order,
}) => {
  const { slug } = useParams();

  function renderSortIcon(field: string) {
    if (sortField !== field) {
      return <span className="icon is-small ml-1">↕</span>;
    }

    if (order === 'desc') {
      return <span className="icon is-small ml-1">↓</span>;
    }

    return <span className="icon is-small ml-1">↑</span>;
  }



  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => onSort('name')}>
            <span>Name</span>
            {renderSortIcon('name')}
          </th>

          <th onClick={() => onSort('sex')}>
            <span>Sex</span>
            {renderSortIcon('sex')}
          </th>

          <th onClick={() => onSort('born')}>
            <span>Born</span>
            {renderSortIcon('born')}
          </th>

          <th onClick={() => onSort('died')}>
            <span>Died</span>
            {renderSortIcon('died')}
          </th>



          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = person.motherName
            ? peopleByName.get(person.motherName.toLowerCase().trim())
            : undefined;

          const father = person.fatherName
            ? peopleByName.get(person.fatherName.toLowerCase().trim())
            : undefined;

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
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
  );
};

