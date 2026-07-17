/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
};

const columns: { field: SortField; label: string }[] = [
  { field: 'name', label: 'Name' },
  { field: 'sex', label: 'Sex' },
  { field: 'born', label: 'Born' },
  { field: 'died', label: 'Died' },
];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get('sort');
  const currentOrder = searchParams.get('order');
  const search = searchParams.toString();

  const getNextSortParams = (field: SortField) => {
    if (currentSort !== field) {
      return { sort: field, order: null };
    }

    if (currentOrder !== 'desc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: SortField) => {
    if (currentSort !== field) {
      return 'fa-sort';
    }

    return currentOrder === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const personLink = (person: Person) => ({
    pathname: `/people/${person.slug}`,
    search,
  });

  const renderParent = (parent?: Person, parentName?: string | null) => {
    if (!parentName) {
      return '-';
    }

    if (!parent) {
      return parentName;
    }

    return (
      <Link
        className={parent.sex === 'f' ? 'has-text-danger' : undefined}
        to={personLink(parent)}
      >
        {parent.name}
      </Link>
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
                <SearchLink params={getNextSortParams(field)}>
                  <span className="icon">
                    <i className={`fas ${getSortIcon(field)}`} />
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
            className={
              person.slug === personSlug ? 'has-background-warning' : ''
            }
          >
            <td>
              <Link
                className={person.sex === 'f' ? 'has-text-danger' : undefined}
                to={personLink(person)}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.mother, person.motherName)}</td>
            <td>{renderParent(person.father, person.fatherName)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
