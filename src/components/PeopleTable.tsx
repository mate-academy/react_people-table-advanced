import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import type { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
};

const columns: {
  title: string;
  field: SortField;
}[] = [
  { title: 'Name', field: 'name' },
  { title: 'Sex', field: 'sex' },
  { title: 'Born', field: 'born' },
  { title: 'Died', field: 'died' },
];

export const PeopleTable = ({ people, allPeople, selectedSlug }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const isSortField = (value: string | null): value is SortField =>
    columns.some(column => column.field === value);

  const sortField = isSortField(sort) ? sort : null;

  const sortedPeople = [...people];

  if (sortField) {
    sortedPeople.sort((a, b) => {
      const left = a[sortField];
      const right = b[sortField];

      let result = 0;

      if (typeof left === 'number' && typeof right === 'number') {
        result = left - right;
      } else {
        result = String(left).localeCompare(String(right));
      }

      return order === 'desc' ? -result : result;
    });
  }

  const toggleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    if (sortField !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (order !== 'desc') {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = allPeople.find(person => person.name === name);

    if (!parent) {
      return name;
    }

    return <PersonLink person={parent} />;
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {column.title}

                <a
                  href="#/people"
                  aria-label={`Sort by ${column.title}`}
                  onClick={event => {
                    event.preventDefault();
                    toggleSort(column.field);
                  }}
                >
                  <span className="icon">
                    <i className={cn('fas', getSortIcon(column.field))} />
                  </span>
                </a>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.motherName)}</td>
            <td>{renderParent(person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
