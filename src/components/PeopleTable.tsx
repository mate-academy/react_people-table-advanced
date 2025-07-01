import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type PeopleTableProps = {
  filteredPeople: Person[];
  selectedPersonSlug: string | null;
};

export const PeopleTable: React.FC<PeopleTableProps> = ({
  filteredPeople,
  selectedPersonSlug,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (field: string) => {
    const order =
      searchParams.get('sort') === field && searchParams.get('order') === 'asc'
        ? 'desc'
        : 'asc';

    searchParams.set('sort', field);
    searchParams.set('order', order);
    setSearchParams(searchParams);
  };

  const getSortIcon = (field: string) => {
    return searchParams.get('sort') === field ? (
      searchParams.get('order') === 'asc' ? (
        <i className="fas fa-sort-up" />
      ) : (
        <i className="fas fa-sort-down" />
      )
    ) : (
      <i className="fas fa-sort" />
    );
  };

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!searchParams.get('sort')) {
      return 0;
    }

    let valA, valB;

    switch (searchParams.get('sort')) {
      case 'name':
        valA = a.name;
        valB = b.name;
        break;
      case 'sex':
        valA = a.sex;
        valB = b.sex;
        break;
      case 'born':
        valA = a.born;
        valB = b.born;
        break;
      case 'died':
        valA = a.died;
        valB = b.died;
        break;
      default:
        return 0;
    }

    if (valA === null) {
      return 1;
    }

    if (valB === null) {
      return -1;
    }

    const comparison =
      typeof valA === 'string'
        ? valA.localeCompare(valB as string)
        : (valA as number) - (valB as number);

    return searchParams.get('order') === 'desc' ? -comparison : comparison;
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('name');
                }}
              >
                <span className="icon">{getSortIcon('name')}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('sex');
                }}
              >
                <span className="icon">{getSortIcon('sex')}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('born');
                }}
              >
                <span className="icon">{getSortIcon('born')}</span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  handleSort('died');
                }}
              >
                <span className="icon">{getSortIcon('died')}</span>
              </a>
            </span>
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
              selectedPersonSlug === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink person={person.name} allPeople={filteredPeople} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={person.motherName}
                allPeople={filteredPeople}
              />
            </td>
            <td>
              <PersonLink
                person={person.fatherName}
                allPeople={filteredPeople}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
