/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[];
};

const filterPeople = (peop: Person[],
  sort: string | null,
  sortDirection: string | null,
  gender: string | null,
  centuries: string[],
  query: string | null) => {
  let filteredPeople: Person[] = [...peop];

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

  switch (gender) {
    case 'm':
      return filteredPeople.filter(person => person.sex === 'm');
    case 'f':
      return filteredPeople.filter(person => person.sex === 'f');
    case null:
    default:
  }

  return filteredPeople;
};

export const PeopleTable = ({ people }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sort');
  const sortDirection = searchParams.get('order');
  const selectedGender = searchParams.get('sex');
  const allCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query');
  const { slug } = useParams();

  const setSortParams = (param: string) => {
    if (searchParams.get('sort') !== null
    && searchParams.get('sort') !== param) {
      searchParams.set('sort', param);
    } else if (searchParams.get('sort') === null) {
      searchParams.set('sort', param);
    } else if (searchParams.get('sort')
    === param && searchParams.get('order') === null) {
      searchParams.append('order', 'desc');
    } else {
      searchParams.delete('order');
      searchParams.delete('sort');
    }

    setSearchParams(searchParams);
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
                    <a onClick={() => setSortParams('name')}>
                      <span className="icon">
                        <i className={cn({
                          'fas fa-sort': sortBy !== 'name',
                          'fas fa-sort-up': sortBy === 'name'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'name'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <a onClick={() => setSortParams('sex')}>
                      <span className="icon">
                        <i className={cn({
                          'fas fa-sort': sortBy !== 'sex',
                          'fas fa-sort-up': sortBy === 'sex'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'sex'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <a onClick={() => setSortParams('born')}>
                      <span className="icon">
                        <i className={cn({
                          'fas fa-sort': sortBy !== 'born',
                          'fas fa-sort-up': sortBy === 'born'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'born'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <a onClick={() => setSortParams('died')}>
                      <span className="icon">
                        <i className={cn({
                          'fas fa-sort': sortBy !== 'died',
                          'fas fa-sort-up': sortBy === 'died'
                      && sortDirection !== 'desc',
                          'fas fa-sort-down': sortBy === 'died'
                      && sortDirection === 'desc',
                        })}
                        />
                      </span>
                    </a>
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
                  className={cn({
                    'has-background-warning': slug === person.slug,
                  })}
                >
                  <td>
                    <Link
                      className={cn({
                        'has-text-danger': person.sex === 'f',
                      })}
                      to={`${person.slug}`}
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
                          to={`${person.mother.slug}`}
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
                          to={`${person.father.slug}`}
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
