import { useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const findParent = (parentName: string | null | undefined) =>
    parentName ? people.find(p => p.name === parentName) : undefined;

  const filteredPeople = people.filter(person => {
    const matchesSex = !sex || person.sex === sex;

    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(query) ||
      (person.motherName?.toLowerCase().includes(query) ?? false) ||
      (person.fatherName?.toLowerCase().includes(query) ?? false);

    const matchesCentury =
      centuries.length === 0 ||
      centuries.includes(String(Math.ceil(person.born / 100)));

    return matchesSex && matchesQuery && matchesCentury;
  });

  const sortedPeople = [...filteredPeople];

  if (sort) {
    sortedPeople.sort((person1, person2) => {
      let result = 0;

      switch (sort) {
        case 'name':
          result = person1.name.localeCompare(person2.name);
          break;
        case 'sex':
          result = person1.sex.localeCompare(person2.sex);
          break;
        case 'born':
          result = person1.born - person2.born;
          break;
        case 'died':
          result = person1.died - person2.died;
          break;
        default:
          break;
      }

      return order === 'desc' ? -result : result;
    });
  }

  const handleSort = (field: SortField) => {
    if (sort !== field) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: null }),
      );

      return;
    }

    if (!order) {
      setSearchParams(
        getSearchWith(searchParams, { sort: field, order: 'desc' }),
      );

      return;
    }

    setSearchParams(getSearchWith(searchParams, { sort: null, order: null }));
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    return order === 'desc' ? 'fas fa-sort-down' : 'fas fa-sort-up';
  };

  const columns: { title: string; field: SortField }[] = [
    { title: 'Name', field: 'name' },
    { title: 'Sex', field: 'sex' },
    { title: 'Born', field: 'born' },
    { title: 'Died', field: 'died' },
  ];

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {columns.map(({ title, field }) => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title}
                <button
                  type="button"
                  className="button is-white p-0"
                  onClick={() => handleSort(field)}
                >
                  <span className="icon">
                    <i className={getSortIcon(field)} />
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
        {sortedPeople.map(person => {
          const mother = person.mother || findParent(person.motherName);
          const father = person.father || findParent(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <SearchLink
                  to={`/people/${person.slug}`}
                  params={{}}
                  className={
                    person.sex === 'f' ? 'has-text-danger' : 'has-text-link'
                  }
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
                    to={`/people/${mother.slug}`}
                    params={{}}
                    className="has-text-danger"
                  >
                    {mother.name}
                  </SearchLink>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <SearchLink to={`/people/${father.slug}`} params={{}}>
                    {father.name}
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
