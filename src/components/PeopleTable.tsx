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
  peoples: Person[];
};

type Obj = {
  sort?: string | null;
  order?: string | null;
};

export const PeopleTable: React.FC<PeopleProps> = ({ peoples }) => {
  const { personSlug } = useParams();
  const selectedPersone = personSlug;

  const [params] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState<Person[]>(peoples);
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
    let newPeoples = [...peoples];
    const query = params.get('query');
    const centuries = params.getAll('centuries');
    const sex = params.get('sex');

    if (query) {
      newPeoples = newPeoples.filter(item => {
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
      newPeoples = newPeoples.filter(person => {
        const centuryBorn = Math.ceil(person.born / 100);

        return centuries.includes(centuryBorn.toString());
      });
    }

    if (sex) {
      newPeoples = newPeoples.filter(person => person.sex === sex);
    }

    setFilteredPeople(newPeoples);
    setSortedPeople(newPeoples);
    sortTables();
  };

  const handleSort = (title: string, sorts: string) => {
    let obj: Obj = { sort: sorts, order: null };
    let classArrow = 'fa-sort';

    if (params.get('sort') === sorts && params.get('order')) {
      obj = { sort: sorts, order: 'desc' };
      classArrow = 'fa-sort-up';
    }

    if (params.get('sort') === sorts && params.get('order')) {
      obj = { sort: null, order: null };
      classArrow = 'fa-sort-down';
    }

    return (
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <SearchLink params={obj}>
          <span className="icon">
            <i className={`fas ${classArrow}`} />
          </span>
        </SearchLink>
      </span>
    );
  };

  useEffect(() => {
    handleFilterChange();
  }, [params]);

  useEffect(() => {
    sortTables();
  }, [sortParams, order]);

  const getPersone = (name: string | null, arr: Person[]) => {
    return arr.find(persone => persone.name === name);
  };

  return (
    <>
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            <th>{handleSort('Name', 'name')}</th>
            <th>{handleSort('Sex', 'sex')}</th>
            <th>{handleSort('Born', 'born')}</th>
            <th>{handleSort('Died', 'died')}</th>
            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {sortedPeople.map(person => {
            const getFather = getPersone(person.fatherName, peoples);
            const getMother = getPersone(person.motherName, peoples);

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': selectedPersone === person.slug,
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
