import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, SortField } from '../types';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';
import { useSearchFilters } from '../hooks/useSearchFilters';

type PeopleTableProps = {
  people: Person[];
};

const TABLE_COLUMNS: { label: string; field: SortField }[] = [
  { label: 'Name', field: 'name' },
  { label: 'Sex', field: 'sex' },
  { label: 'Born', field: 'born' },
  { label: 'Died', field: 'died' },
];

export const PeopleTable: React.FC<PeopleTableProps> = ({ people }) => {
  const { selectedPerson } = useParams();
  const { sort: currentSort, order: currentOrder } = useSearchFilters();

  const getSortIcon = (field: SortField): string => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getSortParams = (field: SortField) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  if (people.length === 0) {
    return null;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_COLUMNS.map(({ label, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={getSortParams(field)}>
                  <span className="icon">
                    <i className={classNames('fas', getSortIcon(field))} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            people={people}
            isSelected={selectedPerson === person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
