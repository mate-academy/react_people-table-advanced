import { Person } from '../types';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '';
  const sortOrder = searchParams.get('order') || '';

  const validActivePerson = slug ? slug : '';
  const sortingColumnHeaders = ['Name', 'Sex', 'Born', 'Died'];

  const getSortPeople = () => {
    const sortedPeople = [...people].sort((a, b) => {
      if (!sortBy) {
        return 0;
      }

      const valueA = a[sortBy as keyof Person];
      const valueB = b[sortBy as keyof Person];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : sortOrder === 'desc'
            ? valueB.localeCompare(valueA)
            : 0
      }

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortOrder === 'asc'
          ? valueA - valueB
          : sortOrder === 'desc'
            ? valueB - valueA
            : 0
      }

      return 0;
    });

    people = sortedPeople
  }

  const handleSortPeople = (header: string) => {
    getSortPeople();

    const updatedOrder = sortBy === header && sortOrder === 'asc'
      ? 'desc'
      : sortOrder === 'desc'
        ? ''
        : 'asc'

    setSearchParams(prev => {
      prev.set('sort', header);
      prev.set('order', updatedOrder);

      return prev;
    });
  };

  const getSortIcon = (header: string) => {
    getSortPeople();

    const baseClass = 'fa ml-1';
    const isActive = sortBy === header && sortOrder;
    const iconClass = isActive
      ? sortOrder === 'asc'
        ? 'fa-sort-up'
        : 'fa-sort-down'
      : 'fa-sort';
    
    return <i className={`${baseClass} ${iconClass} sort-icon `} />;
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {sortingColumnHeaders.map(header => (
              <th
                key={header}
                onClick={() => handleSortPeople(header.toLowerCase())}
              >
                <span className="is-flex is-flex-wrap-nowrap">
                  {header}
                  <span className="icon">
                    {getSortIcon(header.toLowerCase())}
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
            const {
              name,
              sex,
              born,
              died,
              fatherName,
              motherName,
              mother,
              father,
            } = person;

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={
                  person.slug === validActivePerson
                    ? 'has-background-warning'
                    : ''
                }
              >
                <td>
                  <Link
                    className={sex === 'f' ? 'has-text-danger' : ''}
                    to={validActivePerson ? `../${person.slug}` : `./${person.slug}`}
                  >
                    {name}
                  </Link>
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>

                {mother && motherName !== null ? (
                  <td>
                    {motherName !== null ? (
                      <Link
                        className="has-text-danger"
                        to={validActivePerson ? `../${mother.slug}` : `./${mother.slug}`}
                      >
                        {motherName}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                ) : (
                  <td>{motherName !== null ? motherName : '-'}</td>
                )}

                {father && fatherName !== null ? (
                  <td>
                    {fatherName !== null ? (
                      <Link
                        to={validActivePerson? `../${father.slug}`: `./${father.slug}`}
                      >
                        {fatherName}
                      </Link>
                    ) : (
                      '-'
                    )}
                  </td>
                ) : (
                  <td>{fatherName !== null ? fatherName : '-'}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
