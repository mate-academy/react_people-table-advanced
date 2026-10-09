import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

const SORT_FIELDS: SortField[] = ['name', 'sex', 'born', 'died'];

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getPersonUrl = (personSlug: string) => {
    const search = searchParams.toString();

    return {
      pathname: `/people/${personSlug}`,
      search: search ? `?${search}` : '',
    };
  };

  const changeSort = (field: SortField) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (params.get('sort') !== field) {
        params.set('sort', field);
        params.delete('order');
      } else if (params.get('order') !== 'desc') {
        params.set('order', 'desc');
      } else {
        params.delete('sort');
        params.delete('order');
      }

      return params;
    });
  };

  const sortedPeople = [...people];

  if (sort && SORT_FIELDS.includes(sort as SortField)) {
    sortedPeople.sort((a, b) => {
      const field = sort as SortField;
      const first = a[field];
      const second = b[field];

      const result =
        typeof first === 'number' && typeof second === 'number'
          ? first - second
          : String(first).localeCompare(String(second));

      return order === 'desc' ? -result : result;
    });
  }

  const sortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const renderSortHeading = (field: SortField, label: string) => (
    <th key={field}>
      <span className="is-flex is-flex-wrap-nowrap">
        {label}
        <button
          type="button"
          className="button is-white is-small"
          aria-label={`Sort by ${label}`}
          onClick={() => changeSort(field)}
        >
          <span className="icon">
            <i className={`fas ${sortIcon(field)}`} />
          </span>
        </button>
      </span>
    </th>
  );

  const renderParent = (
    parent: Person | undefined,
    parentName: string | null,
    isMother: boolean,
  ) => {
    if (!parentName || parentName === '-') {
      return '-';
    }

    const parentPerson = parent?.slug
      ? parent
      : people.find(person => person.name === parentName);

    if (parentPerson) {
      return (
        <Link
          to={getPersonUrl(parentPerson.slug)}
          className={isMother ? 'has-text-danger' : ''}
        >
          {parentName}
        </Link>
      );
    }

    return parentName;
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeading('name', 'Name')}
          {renderSortHeading('sex', 'Sex')}
          {renderSortHeading('born', 'Born')}
          {renderSortHeading('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={person.slug === slug ? 'has-background-warning' : ''}
          >
            <td>
              <Link
                to={getPersonUrl(person.slug)}
                className={
                  person.sex === 'f' ? 'has-text-danger' : 'has-text-link'
                }
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderParent(person.mother, person.motherName, true)}</td>
            <td>{renderParent(person.father, person.fatherName, false)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
