import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';

interface Props {
  people: Person[];
  onSelect: (person: Person) => void;
  onSort: (field: string) => void;
  sortField?: string;
  sortOrder?: string;
}

export const PeopleTable: React.FC<Props> = ({
  people,
  onSelect,
  onSort,
  sortField,
  sortOrder,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const personFromUrl = people.find(person => person.slug === slug) || null;

  const renderSortIndicator = (field: string) => {
    if (sortField !== field) {
      return null;
    }

    return sortOrder === 'desc' ? ' ↓' : ' ↑';
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          <th
            onClick={() => onSort('name')}
            style={{ cursor: 'pointer' }}
            data-cy="th-name"
          >
            Name{renderSortIndicator('name')}
          </th>
          <th
            onClick={() => onSort('sex')}
            style={{ cursor: 'pointer' }}
            data-cy="th-sex"
          >
            Sex{renderSortIndicator('sex')}
          </th>
          <th
            onClick={() => onSort('born')}
            style={{ cursor: 'pointer' }}
            data-cy="th-born"
          >
            Born{renderSortIndicator('born')}
          </th>
          <th
            onClick={() => onSort('died')}
            style={{ cursor: 'pointer' }}
            data-cy="th-died"
          >
            Died{renderSortIndicator('died')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            className={classNames({
              'has-background-warning': personFromUrl?.slug === person.slug,
            })}
            onClick={() => onSelect(person)}
            data-cy="person"
          >
            <td>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName ? (
                people.find(p => p.name === person.motherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.motherName)!}
                  />
                ) : (
                  person.motherName
                )
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                people.find(p => p.name === person.fatherName) ? (
                  <PersonLink
                    person={people.find(p => p.name === person.fatherName)!}
                  />
                ) : (
                  person.fatherName
                )
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
