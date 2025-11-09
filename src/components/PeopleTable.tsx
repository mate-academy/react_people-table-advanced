import { Person } from '../types';
import PersonLink from './PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

type Props = {
  persons: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const SortableHeader = ({
  field,
  label,
}: {
  field: SortField;
  label: string;
}) => {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');

  const isActive = currentSort === field;
  const isAsc = isActive && currentOrder !== 'desc';

  // Determine next sort params
  let nextParams: { sort?: string | null; order?: string | null } = {};

  if (!isActive) {
    // First click - sort ascending
    nextParams = { sort: field, order: null };
  } else if (isAsc) {
    // Second click - sort descending
    nextParams = { sort: field, order: 'desc' };
  } else {
    // Third click - remove sorting
    nextParams = { sort: null, order: null };
  }

  let iconClass = 'fas fa-sort';

  if (isActive) {
    if (isAsc) {
      iconClass = 'fas fa-sort-up';
    } else {
      iconClass = 'fas fa-sort-down';
    }
  }

  return (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <SearchLink params={nextParams}>
          <span className="icon">
            <i className={iconClass} />
          </span>
        </SearchLink>
      </span>
    </th>
  );
};

export default function PeopleTable({ persons }: Props) {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <SortableHeader field="name" label="Name" />
          <SortableHeader field="sex" label="Sex" />
          <SortableHeader field="born" label="Born" />
          <SortableHeader field="died" label="Died" />

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {persons.map(person => (
          <PersonLink key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
}
