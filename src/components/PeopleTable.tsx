import { useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import type { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string;
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!order) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!sort) return 0;

    const aValue = a[sort];
    const bValue = b[sort];

    if (sort === 'born' || sort === 'died') {
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const result = Number(aValue) - Number(bValue);
      return order === 'desc' ? -result : result;
    }

    const result = String(aValue ?? '').localeCompare(String(bValue ?? ''));
    return order === 'desc' ? -result : result;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
            Name
          </th>
          <th onClick={() => handleSort('sex')} style={{ cursor: 'pointer' }}>
            Sex
          </th>
          <th onClick={() => handleSort('born')} style={{ cursor: 'pointer' }}>
            Born
          </th>
          <th onClick={() => handleSort('died')} style={{ cursor: 'pointer' }}>
            Died
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td style={{ color: person.sex === 'f' ? 'red' : 'blue' }}>
              <PersonLink person={person} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died ?? '-'}</td>
            <td>
              {person.motherName ? (
                <PersonLink name={person.motherName} people={people} />
              ) : (
                '-'
              )}
            </td>
            <td>
              {person.fatherName ? (
                <PersonLink name={person.fatherName} people={people} />
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
