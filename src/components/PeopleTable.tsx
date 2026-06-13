import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getSearchWith } from '../utils/searchHelper';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
};

// Звузили типи для безпеки, як просив ментор
type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const handleSort = (field: SortField) => {
    let nextSort: string | null = field;
    let nextOrder: string | null = null;

    if (currentSort === field) {
      if (currentOrder !== 'desc') {
        // Другий клік: ставимо desc
        nextOrder = 'desc';
      } else {
        // Третій клік: вимикаємо сортування
        nextSort = null;
        nextOrder = null;
      }
    } else {
      // Клік по іншій колонці: починаємо спочатку (asc)
      nextSort = field;
      nextOrder = null;
    }

    // ВИПРАВЛЕНО: Обгорнули у new URLSearchParams
    setSearchParams(
      new URLSearchParams(
        getSearchWith(searchParams, {
          sort: nextSort,
          order: nextOrder,
        }),
      ),
    );
  };

  const getSortArrow = (field: string) => {
    if (currentSort !== field) {
      return '';
    }

    return currentOrder === 'desc' ? ' ▼' : ' ▲';
  };

  const getPersonByName = (name: string) => people.find(p => p.name === name);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            Name{getSortArrow('name')}
          </th>
          <th onClick={() => handleSort('sex')} style={{ cursor: 'pointer' }}>
            Sex{getSortArrow('sex')}
          </th>
          <th onClick={() => handleSort('born')} style={{ cursor: 'pointer' }}>
            Born{getSortArrow('born')}
          </th>
          <th onClick={() => handleSort('died')} style={{ cursor: 'pointer' }}>
            Died{getSortArrow('died')}
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {people.map(person => {
          const isSelected = person.slug === slug;
          const mother = person.motherName
            ? getPersonByName(person.motherName)
            : null;
          const father = person.fatherName
            ? getPersonByName(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <PersonLink person={person} />
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {!person.motherName ? (
                  '-'
                ) : mother ? (
                  <PersonLink person={mother} />
                ) : (
                  person.motherName
                )}
              </td>
              <td>
                {!person.fatherName ? (
                  '-'
                ) : father ? (
                  <PersonLink person={father} />
                ) : (
                  person.fatherName
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
