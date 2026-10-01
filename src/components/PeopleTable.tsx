import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

interface Props {
  people: Person[];
  sort: string | null;
  order: string | null;
}

export const PeopleTable = ({ people, sort, order }: Props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSlug = location.pathname.split('/people/')[1] || '';

  const getSlug = (person: Person) => {
    return `${person.name.toLowerCase().replace(/\s+/g, '-')}-${person.born}`;
  };

  const findParentSlug = (name: string | null | undefined) => {
    if (!name) {
      return null;
    }

    const foundPerson = people.find(p => p.name === name);

    return foundPerson ? getSlug(foundPerson) : null;
  };

  // 1. Click handler to cycle sorting states: asc -> desc -> disabled
  const handleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort === field) {
      if (order === 'asc') {
        // Cycle to descending
        newParams.set('sort', field);
        newParams.set('order', 'desc');
      } else {
        // Cycle to disabled (remove both params)
        newParams.delete('sort');
        newParams.delete('order');
      }
    } else {
      // Start new sort (ascending)
      newParams.set('sort', field);
      newParams.set('order', 'asc');
    }

    setSearchParams(newParams);
  };

  // 2. Visual indicators for the active column
  const renderSortArrow = (field: string) => {
    if (sort !== field) {
      return null;
    }

    return order === 'desc' ? ' ↓' : ' ↑';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-fullwidth is-striped is-hoverable"
    >
      <thead>
        <tr>
          {/* 3. Added onClick handlers and visual indicators */}
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            Name{renderSortArrow('name')}
          </th>
          <th onClick={() => handleSort('sex')} style={{ cursor: 'pointer' }}>
            Sex{renderSortArrow('sex')}
          </th>
          <th onClick={() => handleSort('born')} style={{ cursor: 'pointer' }}>
            Born{renderSortArrow('born')}
          </th>
          <th onClick={() => handleSort('died')} style={{ cursor: 'pointer' }}>
            Died{renderSortArrow('died')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const personSlug = getSlug(person);
          const isSelected = personSlug === currentSlug;

          const motherSlug = findParentSlug(person.motherName);
          const fatherSlug = findParentSlug(person.fatherName);

          return (
            <tr
              key={person.name}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={`/people/${personSlug}`}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  motherSlug ? (
                    <Link
                      to={`/people/${motherSlug}`}
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
              <td>
                {person.fatherName ? (
                  fatherSlug ? (
                    <Link to={`/people/${fatherSlug}`}>
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
