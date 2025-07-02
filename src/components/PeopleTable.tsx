import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: 'name' | 'sex' | 'born' | 'died') => {
    if (sortField !== field) {
      searchParams.set('sort', field);
      searchParams.delete('order');
    } else if (order !== 'desc') {
      searchParams.set('order', 'desc');
    } else {
      searchParams.delete('sort');
      searchParams.delete('order');
    }

    setSearchParams(searchParams);
  };

  const getIcon = (field: 'name' | 'sex' | 'born' | 'died') => {
    if (sortField !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const nameToSlugMap = new Map<string, string>();

  people.forEach(person => {
    nameToSlugMap.set(person.name, person.slug);
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {(['name', 'sex', 'born', 'died'] as const).map(field => (
            <th key={field}>
              <span
                className="is-flex is-flex-wrap-nowrap"
                onClick={() => handleSort(field)}
                style={{ cursor: 'pointer' }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <span className="icon">
                  <i className={getIcon(field)} />
                </span>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const isSelected = person.slug === slug;

          const motherSlug = person.motherName
            ? nameToSlugMap.get(person.motherName)
            : null;

          const fatherSlug = person.fatherName
            ? nameToSlugMap.get(person.fatherName)
            : null;

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
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
