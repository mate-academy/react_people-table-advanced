import { useSearchParams, useParams } from 'react-router-dom';
import { Person } from '../types';
import { Personn } from './person';

interface Props {
  isLoading: boolean;
  people: Person[];
  isError: boolean;
  userQuery: string;
  sexQuery: string;
  agePeople: string[];
}

export const BlockOfPeople: React.FC<Props> = ({
  isLoading,
  people = [],
  isError,
}) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortOrder = searchParams.get('order') as 'asc' | 'desc' | null;

  const query = (searchParams.get('query') || '').toLowerCase();

  const toggleSort = (column: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    const newParams = new URLSearchParams(searchParams);

    if (currentSort !== column) {
      newParams.set('sort', column);
      newParams.set('order', 'asc');
    } else if (currentOrder === 'asc') {
      newParams.set('order', 'desc');
    } else if (currentOrder === 'desc') {
      newParams.delete('sort');
      newParams.delete('order');
    } else {
      newParams.set('order', 'asc');
    }

    setSearchParams(newParams);
  };

  // фільтрація
  const visiblePeople = people.filter(person => {
    return (
      (person.name || '').toLowerCase().includes(query) ||
      (person.motherName || '').toLowerCase().includes(query) ||
      (person.fatherName || '').toLowerCase().includes(query)
    );
  });

  // сортування
  const sortedPeople = [...visiblePeople].sort((a, b) => {
    if (!sortBy || !sortOrder) {
      return 0;
    }

    switch (sortBy) {
      case 'name':
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'sex':
        return sortOrder === 'asc'
          ? a.sex.localeCompare(b.sex)
          : b.sex.localeCompare(a.sex);
      case 'born':
        return sortOrder === 'asc' ? a.born - b.born : b.born - a.born;
      case 'died':
        return sortOrder === 'asc' ? a.died - b.died : b.died - a.died;
      default:
        return 0;
    }
  });

  return (
    <div className="column">
      <div className="box table-container">
        {isError && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {people.length === 0 && !isError && !isLoading && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

        {!isLoading && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                {['name', 'sex', 'born', 'died'].map(column => (
                  <th key={column}>
                    {column[0].toUpperCase() + column.slice(1)}
                    <a
                      href={`#/people?sort=${column}`}
                      onClick={e => {
                        e.preventDefault();
                        toggleSort(column);
                      }}
                    >
                      <span className="icon">
                        {sortBy === column ? (
                          sortOrder === 'asc' ? (
                            <i className="fas fa-sort-up" />
                          ) : (
                            <i className="fas fa-sort-down" />
                          )
                        ) : (
                          <i className="fas fa-sort" />
                        )}
                      </span>
                    </a>
                  </th>
                ))}
                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {sortedPeople.map((person, i) => (
                <Personn
                  key={person.slug}
                  person={person}
                  i={i}
                  selectedSlug={slug}
                  people={people}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
