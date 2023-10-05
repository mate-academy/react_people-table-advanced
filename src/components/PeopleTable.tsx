import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type PeopleTableProps = {
  people: Person[],
};

const filterPeople = (peopleToSort: Person[],
  sort: string | null,
  sortDirection: string | null,
  sex: string | null,
  centuries: string[],
  query: string | null) => {
  let filteredPeople: Person[] = [...peopleToSort];

  switch (sort) {
    case 'born':
      if (sortDirection === 'desc') {
        filteredPeople.sort((a, b) => b.born - a.born);
      } else {
        filteredPeople.sort((a, b) => a.born - b.born);
      }

      break;
    case 'died':
      if (sortDirection === 'desc') {
        filteredPeople.sort((a, b) => b.died - a.died);
      } else {
        filteredPeople.sort((a, b) => a.died - b.died);
      }

      break;
    case 'name':
      if (sortDirection === 'desc') {
        filteredPeople.sort((a, b) => b.name.localeCompare(a.name));
      } else {
        filteredPeople.sort((a, b) => a.name.localeCompare(b.name));
      }

      break;
    case 'sex':
      if (sortDirection === 'desc') {
        filteredPeople.sort((a, b) => b.sex.localeCompare(a.sex));
      } else {
        filteredPeople.sort((a, b) => a.sex.localeCompare(b.sex));
      }

      break;
    case null:
    default:
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => centuries.includes(
      String(Math.floor(person.born / 100) + 1),
    ));
  }

  if (query !== null) {
    filteredPeople = filteredPeople.filter(person => person.name.toLowerCase()
      .includes(query.toLowerCase())
    || person.motherName?.toLowerCase().includes(query.toLowerCase())
    || person.fatherName?.toLowerCase().includes(query.toLowerCase()));
  }

  switch (sex) {
    case 'm':
      return filteredPeople.filter(person => person.sex === 'm');
    case 'f':
      return filteredPeople.filter(person => person.sex === 'f');
    case null:
    default:
  }

  return filteredPeople;
};

export const PeopleTable: React.FC<PeopleTableProps> = (
  { people },
) => {
  const { personSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortDirection = searchParams.get('order');
  const selectedGender = searchParams.get('sex');
  const allCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query');

  const setSortParams = (param: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const currentSort = newSearchParams.get('sort');

    if (currentSort !== param) {
      newSearchParams.set('sort', param);
      newSearchParams.delete('order');
    } else if (newSearchParams.get('order') === 'desc') {
      newSearchParams.delete('order');
      newSearchParams.delete('sort');
    } else {
      newSearchParams.set('order', 'desc');
    }

    setSearchParams(newSearchParams);
  };

  const filteredPeople = filterPeople(people,
    sortBy,
    sortDirection,
    selectedGender,
    allCenturies,
    query);

  return (
    <>
      {filteredPeople.length === 0
        ? <p>There are no people matching the current search criteria</p> : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <button onClick={() => setSortParams('name')} type="button">
                      <span className="icon">
                        <i className={classNames({
                          'fas fa-sort': sortBy !== 'name',
                          'fas fa-sort-up': sortBy === 'name'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'name'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </button>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <button onClick={() => setSortParams('sex')} type="button">
                      <span className="icon">
                        <i className={classNames({
                          'fas fa-sort': sortBy !== 'sex',
                          'fas fa-sort-up': sortBy === 'sex'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'sex'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </button>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <button onClick={() => setSortParams('born')} type="button">
                      <span className="icon">
                        <i className={classNames({
                          'fas fa-sort': sortBy !== 'born',
                          'fas fa-sort-up': sortBy === 'born'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'born'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </button>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <button
                      onClick={() => setSortParams('died')}
                      type="button"
                    >
                      <span className="icon">
                        <i className={classNames({
                          'fas fa-sort': sortBy !== 'died',
                          'fas fa-sort-up': sortBy === 'died'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'died'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </button>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {filteredPeople.map((person) => (

                <tr
                  data-cy="person"
                  className={classNames({
                    'has-background-warning': personSlug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      className={classNames({
                        'has-text-danger': person.sex === 'f',
                      })}
                      to={`/people/${person.slug}`}
                    >
                      {person.name}
                    </Link>
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>
                    {person.mother
                      ? (
                        <Link
                          className="has-text-danger"
                          to={`${person.mother.slug}?${searchParams.toString()}`}
                        >
                          {person.motherName}
                        </Link>
                      )
                      : person.motherName || '-'}

                  </td>
                  <td>
                    {person.father
                      ? (
                        <Link
                          to={`${person.father.slug}?${searchParams.toString()}`}
                        >
                          {person.fatherName}
                        </Link>
                      )
                      : person.fatherName || '-'}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

    </>
  );
};
