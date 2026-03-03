import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';
import { SortField, TableHeader } from '../types/SortTypes';

type Props = {
  people: Person[];
};

const PEOPLE_TABLE_HEADERS: TableHeader[] = [
  {
    label: 'Name',
    field: 'name',
    sortable: true,
  },
  { label: 'Sex', field: 'sex', sortable: true },
  { label: 'Born', field: 'born', sortable: true },
  { label: 'Died', field: 'died', sortable: true },
  { label: 'Mother', field: 'motherName', sortable: false },
  {
    label: 'Father',
    field: 'fatherName',
    sortable: false,
  },
];

export const PeopleTable: React.FC<Props> = ({ people }: Props) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (field: SortField) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order');

    if (currentSort !== field) {
      setSearchParams(getSearchWith(searchParams, { sort: field }));
    } else if (currentSort === field && !currentOrder) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'desc' }),
      );
    } else {
      setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
    }
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {PEOPLE_TABLE_HEADERS.map(header => (
            <th
              key={header.field}
              className={header.sortable ? 'is-clickable' : undefined}
              onClick={
                header.sortable ? () => handleSort(header.field) : undefined
              }
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={slug === person.slug ? 'has-background-warning' : ''}
          >
            <td>
              <PersonLink person={person} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>

            {person.mother ? (
              <td>
                <PersonLink person={person.mother} />
              </td>
            ) : (
              <td>{person.motherName || '-'}</td>
            )}

            {person.father ? (
              <td>
                <PersonLink person={person.father} />
              </td>
            ) : (
              <td>{person.fatherName || '-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
