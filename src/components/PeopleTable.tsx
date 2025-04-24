import { useLocation, useNavigate } from 'react-router-dom';
import { Person } from '../types';
import { useEffect, useState } from 'react';
import { PersonLink } from './PersonalLink';

type PeopleTableProps = {
  people: Person[];
  selectedPersonSlug: string | null;
};

type SortField = 'name' | 'sex' | 'born' | 'died' | null;
type SortOrder = 'asc' | 'desc' | null;

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  selectedPersonSlug,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const fieldParam = searchParams.get('sort') as SortField;
    const orderParam = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

    if (fieldParam) {
      setSortField(fieldParam);
      setSortOrder(orderParam);
    }
  }, [location.search]);

  const updateUrl = (field: SortField, order: SortOrder) => {
    const searchParams = new URLSearchParams();

    if (field) {
      searchParams.set('sort', field);
      if (order === 'desc') {
        searchParams.set('order', 'desc');
      }
    }

    navigate(`/people?${searchParams.toString()}`, { replace: true });
  };

  const handleSort = (field: SortField) => {
    let newOrder: SortOrder = 'asc';
    let newField: SortField = field;

    if (sortField === field) {
      if (sortOrder === 'asc') {
        newOrder = 'desc';
      } else if (sortOrder === 'desc') {
        newField = null;
        newOrder = null;
      }
    }

    setSortField(newField);
    setSortOrder(newOrder);
    updateUrl(newField, newOrder);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <i className="fas fa-sort" />;
    }

    return sortOrder === 'asc' ? (
      <i className="fas fa-sort-up" />
    ) : (
      <i className="fas fa-sort-down" />
    );
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (!sortField) {
      return 0;
    }

    let valA: string | number | null = null;
    let valB: string | number | null = null;

    switch (sortField) {
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

    return sortOrder === 'desc' ? -comparison : comparison;
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
              <PersonLink person={person.name} allPeople={people} />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink person={person.motherName} allPeople={people} />
            </td>
            <td>
              <PersonLink person={person.fatherName} allPeople={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
