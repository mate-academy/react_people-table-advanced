import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

export type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  allPeople: Person[];
  selectedSlug?: string;
  sortField?: SortField;
  isDescending: boolean;
  onSort: (field: SortField) => void;
};

const sortableColumns: {
  field: SortField;
  label: string;
}[] = [
  { field: 'name', label: 'Name' },
  { field: 'sex', label: 'Sex' },
  { field: 'born', label: 'Born' },
  { field: 'died', label: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({
  people,
  allPeople,
  selectedSlug,
  sortField,
  isDescending,
  onSort,
}) => {
  const findPerson = (name: string | null) =>
    allPeople.find(person => person.name === name);

  const renderParent = (name: string | null) => {
    if (!name) {
      return '-';
    }

    const parent = findPerson(name);

    if (!parent) {
      return name;
    }

    return <PersonLink person={parent} />;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {sortableColumns.map(({ field, label }) => (
            <th key={field}>
              <span className="is-flex is-align-items-center">
                {label}

                <button
                  type="button"
                  className="button is-white is-small ml-1"
                  aria-label={`Sort by ${label}`}
                  onClick={() => onSort(field)}
                >
                  <span className="icon is-small">
                    <i
                      className={`fas fa-sort-${
                        sortField === field
                          ? isDescending
                            ? 'down'
                            : 'up'
                          : 'up'
                      }`}
                    />
                  </span>
                </button>
              </span>
            </th>
          ))}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              person.slug === selectedSlug ? 'has-background-warning' : ''
            }
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
