/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';

interface PeopleTableProps {
  people: Person[];
}

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const { tabId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries') || [];
  const selectedGenders = searchParams.getAll('gender') || [];

  const yearToCentury = (year: number) => Math.ceil(year / 100);

  const handleSort = (field: string) => {
    let newOrder = 'asc';
    if (searchParams.get('sort') === field) {
      newOrder = searchParams.get('order') === 'asc' ? 'desc' : 'asc';
    }
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', field);
    newSearchParams.set('order', newOrder);
  
    setSearchParams(newSearchParams);
  }

  const applyFilters = () => {
    return people
      .filter(person => {
        return (
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.motherName?.toLowerCase().includes(query.toLowerCase()) ||
          person.fatherName?.toLowerCase().includes(query.toLowerCase())
        );
      })
      .filter(person => {
        return (
          selectedCenturies.length === 0 ||
          selectedCenturies.includes(yearToCentury(person.born).toString())
        );
      })
      .filter(person => {
        return (
          selectedGenders.length === 0 ||
          selectedGenders.includes(person.sex)
        );
      });
  };

  const getSortedFilteredPeople = () => {
    const sortField = searchParams.get('sort');
    const sortOrder = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    let filtered = applyFilters();

    if (sortField) {
      filtered = sortPeople(filtered, sortField, sortOrder);
    }
  
    return filtered;
  }

  const sortPeople = (people: Person[], sortField: string, sortOrder: 'asc' | 'desc') => {
    if (!sortField || !['name', 'sex', 'born', 'died', 'fatherName', 'motherName', 'slug'].includes(sortField)) {
      return people;
    }
  
    return people.sort((a, b) => {
      const valueA = a[sortField as keyof Person];
      const valueB = b[sortField as keyof Person];
  
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
  
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
  
      return 0;
    });
  };

  const filteredSortedPeople = getSortedFilteredPeople();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name<span className="icon"><i className="fas fa-sort"></i></span></th>
          <th onClick={() => handleSort('sex')}>Sex<span className="icon"><i className="fas fa-sort"></i></span></th>
          <th onClick={() => handleSort('born')}>Born<span className="icon"><i className="fas fa-sort"></i></span></th>
          <th onClick={() => handleSort('died')}>Died<span className="icon"><i className="fas fa-sort"></i></span></th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {filteredSortedPeople.map((person: Person) => (
          <tr
            key={person.slug}
            data-cy="person"
            className={tabId === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <PersonLink name={person.name} people={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
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
