import { Link, useParams, useSearchParams } from 'react-router-dom';

import { Person } from '../types/Person';

type Props = {
  people: Person[];
};

type SortField = 'name' | 'sex' | 'born' | 'died';

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') as SortField | null;
  const order = searchParams.get('order');

  const getCentury = (year: number) => Math.ceil(year / 100);

  const findPersonByName = (name: string | null) => {
    if (!name) {
      return undefined;
    }

    return people.find(person => person.name === name);
  };

  const filteredPeople = people.filter(person => {
    const normalizedQuery = query.toLowerCase();

    const matchesQuery =
      !query ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      person.motherName?.toLowerCase().includes(normalizedQuery) ||
      person.fatherName?.toLowerCase().includes(normalizedQuery);

    const matchesCentury =
      selectedCenturies.length === 0 ||
      selectedCenturies.includes(String(getCentury(person.born)));

    return matchesQuery && matchesCentury;
  });

  const sortedPeople = [...filteredPeople].sort((personA, personB) => {
    if (!sort) {
      return 0;
    }

    let result = 0;

    switch (sort) {
      case 'name':
        result = personA.name.localeCompare(personB.name);
        break;

      case 'sex':
        result = personA.sex.localeCompare(personB.sex);
        break;

      case 'born':
        result = personA.born - personB.born;
        break;

      case 'died':
        result = personA.died - personB.died;
        break;

      default:
        return 0;
    }

    return order === 'desc' ? -result : result;
  });

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams);

    const currentSort = params.get('sort');
    const currentOrder = params.get('order');

    if (currentSort !== field) {
      params.set('sort', field);
      params.delete('order');
    } else if (!currentOrder) {
      params.set('order', 'desc');
    } else {
      params.delete('sort');
      params.delete('order');
    }

    setSearchParams(params);
  };

  const getSortIcon = (field: SortField) => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  const getPersonLink = (person: Person) => ({
    pathname: `/people/${person.slug}`,
    search: searchParams.toString(),
  });

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <button
                type="button"
                className="button is-white"
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-white"
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-white"
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-white"
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {sortedPeople.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                  to={getPersonLink(person)}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>

              <td>{person.born}</td>

              <td>{person.died}</td>

              <td>
                {mother ? (
                  <Link
                    to={getPersonLink(mother)}
                    className={mother.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {mother.name}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link
                    to={getPersonLink(father)}
                    className={father.sex === 'f' ? 'has-text-danger' : ''}
                  >
                    {father.name}
                  </Link>
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
