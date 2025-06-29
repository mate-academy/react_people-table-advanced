import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { useParams, useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../utils/searchHelper';

interface PeopleTableProps {
  people: Person[];
}
type SortField = 'name' | 'sex' | 'born' | 'died';

const columns: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'sex', label: 'Sex' },
  { field: 'born', label: 'Born' },
  { field: 'died', label: 'Died' },
];

export const PeopleTable = ({ people }: PeopleTableProps) => {
  const [searchParams] = useSearchParams();
  const { selectedSlug } = useParams();
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
          {columns.map(({ field, label }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {label}
                <SearchLink params={handleSortChange(field)}>
                  <span className="icon">
                    {renderSortIcon(field)}
                    <i className="fas" />
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
          <tr
            key={person.slug}
            data-cy="person"
            className={cn({
              'has-background-warning': person.slug === selectedSlug,
            })}
          >
            <td>
              <PersonLink name={person.name} people={people} />
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink name={person.motherName} people={people} />
            </td>
            <td>
              <PersonLink name={person.fatherName} people={people} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
