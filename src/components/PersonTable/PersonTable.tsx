import { useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import { SearchParams } from '../../utils/searchHelper';
import { PersonTR } from '../PersonTR/PersonTR';
import { SearchLink } from '../SearchLink/SearchLink';

type Props = {
  persons: Person[];
};

type ColumnConfig = {
  key: keyof Person;
  label: string;
  sortable: boolean;
};

const COLUMNS: ColumnConfig[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'sex', label: 'Sex', sortable: true },
  { key: 'born', label: 'Born', sortable: true },
  { key: 'died', label: 'Died', sortable: true },
  { key: 'motherName', label: 'Mother', sortable: false },
  { key: 'fatherName', label: 'Father', sortable: false },
];

export const PersonTable: React.FC<Props> = ({ persons }) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const getSortParams = (column: keyof Person): SearchParams => {
    if (currentSort !== column) {
      return { sort: column, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: column, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (column: keyof Person): string => {
    if (currentSort !== column) {
      return 'fas fa-sort';
    }

    return currentOrder === 'desc'
      ? 'fas fa-sort-down has-text-info'
      : 'fas fa-sort-up has-text-info';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ key, label, sortable }) => (
            <th key={key}>
              <p className="is-flex is-flex-wrap-nowrap is-align-items-center">
                {label}
                {sortable && (
                  <SearchLink params={getSortParams(key)} className="ml-2">
                    <span className="icon">
                      <i className={getSortIcon(key)} />
                    </span>
                  </SearchLink>
                )}
              </p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <PersonTR key={person.slug} person={person} people={persons} />
        ))}
      </tbody>
    </table>
  );
};
