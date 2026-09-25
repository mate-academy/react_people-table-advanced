import cn from 'classnames';
import { useParams, useSearchParams } from 'react-router-dom';
import { PersonRow } from './PersonRow';
import { Person } from '../../types';
import { SearchLink } from '../SearchLink';

type Column = {
  id: keyof Pick<Person, 'name' | 'sex' | 'born' | 'died'>;
  label: string;
};

const columns: Column[] = [
  { id: 'name', label: 'Name' },
  { id: 'sex', label: 'Sex' },
  { id: 'born', label: 'Born' },
  { id: 'died', label: 'Died' },
];

type Props = { people: Person[] };
type SortOrder = 'asc' | 'desc' | null;

export const PeopleTable = ({ people }: Props) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const [sort, order] = [
    searchParams.get('sort'),
    searchParams.get('order') as SortOrder,
  ];

  const getSortParams = (field: keyof Person) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (order !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ id, label }) => {
            const isSorted = sort === id;

            const sortIconClass = cn('fas', {
              'fa-sort': !isSorted,
              'fa-sort-up': isSorted && order !== 'desc',
              'fa-sort-down': isSorted && order === 'desc',
            });

            return (
              <th key={id}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {label}
                  <SearchLink params={getSortParams(id)}>
                    <span className="icon">
                      <i className={sortIconClass}></i>
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            person={person}
            selectedPersonSlug={personSlug}
          />
        ))}
      </tbody>
    </table>
  );
};
