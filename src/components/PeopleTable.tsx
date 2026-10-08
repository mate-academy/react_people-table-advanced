import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';

type SortField = 'name' | 'sex' | 'born' | 'died';

type Props = {
  people: Person[];
  allPeople?: Person[];
};

const sortFields: SortField[] = ['name', 'sex', 'born', 'died'];

const isSortField = (value: string | null): value is SortField =>
  sortFields.includes(value as SortField);

const compareText = (first: string, second: string) =>
  first.localeCompare(second, undefined, { sensitivity: 'base' });

const getPersonColorClass = (person: Person) =>
  person.sex === 'f' ? 'has-text-danger' : 'has-text-link';

export const PeopleTable = ({ people, allPeople = people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug: selectedSlug } = useParams();
  const currentSort = searchParams.get('sort');
  const order = searchParams.get('order');
  const sort = isSortField(currentSort) ? currentSort : null;

  const handleSort = (field: SortField) => {
    const newParams = new URLSearchParams(searchParams);

    if (sort !== field) {
      newParams.set('sort', field);
      newParams.delete('order');
    } else if (order !== 'desc') {
      newParams.set('order', 'desc');
    } else {
      newParams.delete('sort');
      newParams.delete('order');
    }

    setSearchParams(newParams);
  };

  const sortedPeople = [...people];

  if (sort) {
    sortedPeople.sort((firstPerson, secondPerson) => {
      const comparison =
        sort === 'born' || sort === 'died'
          ? firstPerson[sort] - secondPerson[sort]
          : compareText(firstPerson[sort], secondPerson[sort]);

      return order === 'desc' ? -comparison : comparison;
    });
  }

  const renderSortIcon = (field: SortField) => {
    const icon =
      sort !== field
        ? 'fa-sort'
        : order === 'desc'
          ? 'fa-sort-down'
          : 'fa-sort-up';

    return (
      <span className="icon">
        <i className={`fas ${icon}`} aria-hidden="true" />
      </span>
    );
  };

  return (
    <table
      data-cy="peopleTable"
      className="is-striped is-hoverable is-narrow is-fullwidth table"
    >
      <thead>
        <tr>
          {sortFields.map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <button
                  type="button"
                  aria-label={`Sort by ${field}`}
                  className="button is-white is-small"
                  onClick={() => handleSort(field)}
                >
                  {renderSortIcon(field)}
                </button>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = allPeople.find(
            candidate => candidate.name === person.motherName,
          );
          const father = allPeople.find(
            candidate => candidate.name === person.fatherName,
          );

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={
                person.slug === selectedSlug ? 'has-background-warning' : ''
              }
            >
              <td>
                <SearchLink
                  className={getPersonColorClass(person)}
                  to={`/people/${person.slug}`}
                  params={{}}
                >
                  {person.name}
                </SearchLink>
              </td>
              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {mother ? (
                  <SearchLink
                    className={getPersonColorClass(mother)}
                    to={`/people/${mother.slug}`}
                    params={{}}
                  >
                    {person.motherName}
                  </SearchLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>
              <td>
                {father ? (
                  <SearchLink
                    className={getPersonColorClass(father)}
                    to={`/people/${father.slug}`}
                    params={{}}
                  >
                    {person.fatherName}
                  </SearchLink>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
