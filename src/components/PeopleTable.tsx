import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchParams } from '../utils/searchHelper';
import { PersonRow } from './PersonRow';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const COLUMNS: { key: SortField; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'sex', label: 'Sex' },
  { key: 'born', label: 'Born' },
  { key: 'died', label: 'Died' },
];

export const PeopleTable = ({ people }: Props) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const handleSortChange = (field: SortField): SearchParams => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (sort && !order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const renderSortIcon = (field: string) => {
    if (sort !== field) {
      return <i className="fas fa-sort" />;
    }

    return order === 'desc' ? (
      <i className="fas fa-sort-down" />
    ) : (
      <i className="fas fa-sort-up" />
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map(({ key, label }) => (
            <th key={key}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={handleSortChange(key)}>
                  <span className="icon">{renderSortIcon(key)}</span>
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
          <PersonRow key={person.slug} people={people} person={person} />
        ))}
      </tbody>
    </table>
  );
};
