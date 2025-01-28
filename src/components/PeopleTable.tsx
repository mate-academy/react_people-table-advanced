import React, { useEffect, useState } from 'react';
import PersonLink from './PersonLink';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type SortField = {
  field: string | null;
  stateNum: number;
};

interface PeopleTableProps {
  people: Person[];
  allPeople: Person[];
}

const PeopleTable: React.FC<PeopleTableProps> = ({ people, allPeople }) => {
  const { slug } = useParams();
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [sortState, setSortState] = useState<SortField>({
    field: null,
    stateNum: 0,
  });
  const [sortedState, setSortedState] = useState<Person[]>(people);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get('sort') || null;
    const order = searchParams.get('order') || null;

    if (sort && ['name', 'sex', 'born', 'died'].includes(sort)) {
      const stateNum = order === 'desc' ? 2 : 1;

      setSortState({
        field: sort,
        stateNum,
      });
    } else {
      setSortState({ field: null, stateNum: 0 });
    }
  }, []);

  const sortHandle = (field: keyof Person) => {
    setSortState(prevState => {
      let newStateNum = 0;

      if (field === prevState.field) {
        newStateNum = prevState.stateNum === 2 ? 0 : prevState.stateNum + 1;
      } else {
        newStateNum = 1;
      }

      const params = new URLSearchParams(searchParams);

      if (newStateNum === 0) {
        params.delete('sort');
        params.delete('order');
      } else {
        params.set('sort', field);
        if (newStateNum === 2) {
          params.set('order', 'desc');
        } else {
          params.delete('order');
        }
      }

      setSearchParams(params);

      return { field, stateNum: newStateNum };
    });
  };

  useEffect(() => {
    if (slug !== undefined) {
      setSelectedPerson(slug);
    }
  }, [slug]);

  useEffect(() => {
    setSortedState(people);

    const { field, stateNum } = sortState;

    if (stateNum === 0) {
      setSortedState(people);
    } else if (
      field === 'name' ||
      field === 'sex' ||
      field === 'born' ||
      field === 'died'
    ) {
      const sortedPeople = people.slice().sort((a, b) => {
        if (stateNum === 1) {
          return typeof a[field] === 'string' && typeof b[field] === 'string'
            ? a[field].localeCompare(b[field])
            : +a[field] - +b[field];
        }

        return typeof a[field] === 'string' && typeof b[field] === 'string'
          ? b[field].localeCompare(a[field])
          : +b[field] - +a[field];
      });

      setSortedState(sortedPeople);
    }
  }, [sortState, people]);

  const findPersonByName = (name: string): Person | undefined => {
    return allPeople.find(p => p.name === name);
  };

  if (allPeople.length === 0) {
    return <p>There are no people on the server</p>;
  }

  if (people.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

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
              <Link
                to="#/"
                onClick={() => {
                  sortHandle('name');
                }}
              >
                <span className="icon">
                  <i
                    className={
                      sortState.field === 'name' && sortState.stateNum === 1
                        ? 'fas fa-sort-up'
                        : sortState.field === 'name' && sortState.stateNum === 2
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to="#/" onClick={() => sortHandle('sex')}>
                <span className="icon">
                  <i
                    className={
                      sortState.field === 'sex' && sortState.stateNum === 1
                        ? 'fas fa-sort-up'
                        : sortState.field === 'sex' && sortState.stateNum === 2
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to="#/" onClick={() => sortHandle('born')}>
                <span className="icon">
                  <i
                    className={
                      sortState.field === 'born' && sortState.stateNum === 1
                        ? 'fas fa-sort-up'
                        : sortState.field === 'born' && sortState.stateNum === 2
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to="#/" onClick={() => sortHandle('died')}>
                <span className="icon">
                  <i
                    className={
                      sortState.field === 'died' && sortState.stateNum === 1
                        ? 'fas fa-sort-up'
                        : sortState.field === 'died' && sortState.stateNum === 2
                          ? 'fas fa-sort-down'
                          : 'fas fa-sort'
                    }
                  />
                </span>
              </Link>
            </span>
          </th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>
      <tbody>
        {sortedState.map(person => (
          <tr
            key={person.slug}
            data-cy="person"
            className={
              selectedPerson === person.slug ? 'has-background-warning' : ''
            }
          >
            <td>
              <PersonLink
                person={person}
                setSelectedPerson={setSelectedPerson}
              />
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              {person.motherName && findPersonByName(person.motherName) ? (
                <PersonLink
                  person={findPersonByName(person.motherName)!}
                  setSelectedPerson={setSelectedPerson}
                />
              ) : (
                person.motherName || '-'
              )}
            </td>
            <td>
              {person.fatherName && findPersonByName(person.fatherName) ? (
                <PersonLink
                  person={findPersonByName(person.fatherName)!}
                  setSelectedPerson={setSelectedPerson}
                />
              ) : (
                person.fatherName || '-'
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PeopleTable;
