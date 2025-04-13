import classNames from 'classnames';
import { Person } from '../types';
import {
  NavLink,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SearchLink } from './SearchLink';

type PeopleProps = {
  people: Person[];
};

export const PeopleTable: React.FC<PeopleProps> = ({ people }) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug;

  const [params] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(people);
  const [sortedPeople, setSortedPeople] = useState<Person[]>([
    ...filteredPeople,
  ]);
  const sortParams = params.get('sort');
  const order = params.get('order');
  const { search } = useLocation();

  const sortTables = () => {
    if (!sortParams) {
      setSortedPeople(filteredPeople);
    }

    if (sortParams === 'name' || sortParams === 'sex') {
      if (order === 'desc') {
        setSortedPeople(prev => {
          return [...prev].sort((n1, n2) => {
            return n2[sortParams].localeCompare(n1[sortParams]);
          });
        });
      } else {
        setSortedPeople(prev => {
          return [...prev].sort((n1, n2) => {
            return n1[sortParams].localeCompare(n2[sortParams]);
          });
        });
      }
    }

    if (sortParams === 'born' || sortParams === 'died') {
      if (order === 'desc') {
        setSortedPeople(prev => {
          return [...prev].sort((a, b) => {
            return b[sortParams] - a[sortParams];
          });
        });
      } else {
        setSortedPeople(prev => {
          return [...prev].sort((a, b) => {
            return a[sortParams] - b[sortParams];
          });
        });
      }
    }
  };

  const handleFilterChange = () => {
    let newPeople = [...people];
    const query = params.get('query');
    const centuries = params.getAll('centuries');
    const sex = params.get('sex');

    if (query) {
      newPeople = newPeople.filter(item => {
        const lowerQuery = query.toLowerCase();
        const lowerName = item.name.toLowerCase();
        const lowerFatherName = item.fatherName?.toLowerCase();
        const lowerMatherName = item.motherName?.toLowerCase();

        return (
          lowerName.includes(lowerQuery) ||
          lowerFatherName?.includes(lowerQuery) ||
          lowerMatherName?.includes(lowerQuery)
        );
      });
    }

    if (centuries.length) {
      newPeople = newPeople.filter(person => {
        const centuryBorn = Math.ceil(person.born / 100);

        return centuries.includes(centuryBorn.toString());
      });
    }

    if (sex) {
      newPeople = newPeople.filter(person => person.sex === sex);
    }

    setFilteredPeople(newPeople);
    setSortedPeople(newPeople);
    sortTables();
  };

  const [sortConfig, setSortConfig] = useState<{
    sort: string | null;
    order: string | null;
  }>({
    sort: null,
    order: null,
  });

  const handleSort = (sorts: string) => {
    setSortConfig(prev => {
      if (prev.sort === sorts) {
        return prev.order === 'asc'
          ? { sort: sorts, order: 'desc' }
          : { sort: null, order: 'asc' };
      }

      return { sort: sorts, order: 'asc' };
    });
  };

  const getIconClass = (sortsType: string) => {
    if (sortConfig.sort === sortsType) {
      return sortConfig.order === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
    }

    return 'fa-sort';
  };

  useEffect(() => {
    handleFilterChange();
  }, [params]);

  useEffect(() => {
    sortTables();
  }, [sortParams, order]);

  const getPersone = (name: string | null, arr: Person[]) => {
    return arr.find(person => person.name === name);
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>
              <span className="is-flex is-flex-wrap-nowrap">
                Name
                <SearchLink params={sortConfig}>
                  <span className="icon">
                    <i className={`fas ${getIconClass('name')}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th onClick={() => handleSort('sex')}>
              <span className="is-flex is-flex-wrap-nowrap">
                Sex
                <SearchLink params={sortConfig}>
                  <span className="icon">
                    <i className={`fas ${getIconClass('sex')}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th onClick={() => handleSort('born')}>
              <span className="is-flex is-flex-wrap-nowrap">
                Born
                <SearchLink params={sortConfig}>
                  <span className="icon">
                    <i className={`fas ${getIconClass('born')}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th onClick={() => handleSort('died')}>
              <span className="is-flex is-flex-wrap-nowrap">
                Died
                <SearchLink params={sortConfig}>
                  <span className="icon">
                    <i className={`fas ${getIconClass('died')}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortedPeople.map(person => {
            const getFather = getPersone(person.fatherName, people);
            const getMother = getPersone(person.motherName, people);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': selectedPerson === person.slug,
                })}
              >
                <td>
                  <NavLink
                    to={`${person.slug}${search}`}
                    className={classNames({
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </NavLink>
                </td>
                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                {person.motherName ? (
                  <td>
                    {getMother ? (
                      <NavLink
                        className="has-text-danger"
                        to={`${getMother.slug}${search}`}
                      >
                        {person.motherName}
                      </NavLink>
                    ) : (
                      person.motherName
                    )}
                  </td>
                ) : (
                  <td>-</td>
                )}
                {person.fatherName ? (
                  <td>
                    {getFather ? (
                      <NavLink to={`${getFather?.slug}${search}`}>
                        {person.fatherName}
                      </NavLink>
                    ) : (
                      person.fatherName
                    )}
                  </td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
