import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useSearchParams } from 'react-router-dom';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];
  const sex = searchParams.get('sex');

  const filteredPeople = people.filter(person => {
    if (query) {
      const lowerQuery = query.toLowerCase();

      const matchesName = person.name.toLowerCase().includes(lowerQuery);
      const matchesMother =
        person.motherName?.toLowerCase().includes(lowerQuery) ?? false;
      const matchesFather =
        person.fatherName?.toLowerCase().includes(lowerQuery) ?? false;

      if (!(matchesName || matchesFather || matchesMother)) {
        return false;
      }
    }

    if (centuries.length > 0) {
      const birthCentury: string = `${Math.ceil(person.born / 100)}`;

      if (!centuries.includes(birthCentury)) {
        return false;
      }
    }

    if (sex) {
      if (person.sex !== sex) {
        return false;
      }
    }

    return true;
  });

  function handleSort(field: string) {
    const params = new URLSearchParams(searchParams);

    if (sortField !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  }

  const sortBy = [...filteredPeople].sort((a, b) => {
    switch (sortField) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'sex':
        return a.sex.localeCompare(b.sex);
      case 'born':
        return a.born - b.born;
      case 'died':
        return a.died - b.died;
      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortBy.reverse();
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('sex')}>Sex</th>
          <th onClick={() => handleSort('born')}>Born</th>
          <th onClick={() => handleSort('died')}>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortBy.map((person: Person) => {
          const mother = people.find(p => p.name === person.motherName);
          const father = people.find(p => p.name === person.fatherName);

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
                <PersonLink person={mother} name={person.motherName} />
              </td>
              <td>
                <PersonLink person={father} name={person.fatherName} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
