import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

type PeopleTableProps = {
  people: Person[];
};

const COLUMNS = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'sex', label: 'Sex', sortable: true },
  { key: 'born', label: 'Born', sortable: true },
  { key: 'died', label: 'Died', sortable: true },
  { key: 'motherName', label: 'Mother', sortable: false },
  { key: 'fatherName', label: 'Father', sortable: false },
];

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const sortedPeople = (columnName: string) => {
    if (currentSort !== columnName) {
      return { sort: columnName, order: null };
    }

    if (currentSort === columnName && currentOrder === null) {
      return { sort: columnName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (columnName: string) => {
    if (currentSort !== columnName) {
      return 'fas fa-sort';
    }

    if (currentSort === columnName && currentOrder === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(col => (
            <th key={col.key}>
              {col.sortable ? (
                <span className="is-flex is-flex-wrap-nowrap">
                  {col.label}
                  <SearchLink params={sortedPeople(col.key)}>
                    <span className="icon">
                      <i className={getSortIcon(col.key)} />
                    </span>
                  </SearchLink>
                </span>
              ) : (
                col.label
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.length === 0 ? (
          <tr>
            <td colSpan={COLUMNS.length}>
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            </td>
          </tr>
        ) : (
          people.map(person => {
            return (
              <PersonLink key={person.slug} person={person} people={people} />
            );
          })
        )}
      </tbody>
    </table>
  );
};