import { useContext, useEffect, useState } from 'react';
import { getPeopleContext } from '../contexts/ContextGetPeople';
import { PersonInfo } from './PersonInfo';
import { useSearchParams } from 'react-router-dom';

export const PeopleTable = () => {
  const { people } = useContext(getPeopleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredPeople, setFilteredPeople] = useState([...people]);

  const applyFiltersAndSort = () => {
    let newPeople = [...people];
    const order = searchParams.get('order') || 'asc';
    const centuriesFilter = searchParams.getAll('century');
    const sexFilter = searchParams.get('sex');
    const query = searchParams.get('query')?.toLowerCase();

    if (sexFilter) {
      newPeople = newPeople.filter(person => person.sex === sexFilter);
    }

    const sortParam = searchParams.get('sort');

    if (sortParam) {
      newPeople = newPeople.sort((a, b) => {
        let compareResult = 0;

        if (sortParam === 'name' || sortParam === 'sex') {
          compareResult = a[sortParam].localeCompare(b[sortParam]);
        } else if (sortParam === 'born' || sortParam === 'died') {
          compareResult = (a[sortParam] || 0) - (b[sortParam] || 0);
        }

        return order === 'asc' ? compareResult : -compareResult;
      });
    }

    if (query) {
      newPeople = newPeople.filter(
        person =>
          person.name.toLowerCase().includes(query.trim()) ||
          (person.motherName || '').toLowerCase().includes(query) ||
          (person.fatherName || '').toLowerCase().includes(query),
      );
    }

    if (centuriesFilter.length > 0) {
      newPeople = newPeople.filter(person =>
        centuriesFilter.includes(
          (Math.floor(person.born / 100) + 1).toString(),
        ),
      );
    }

    setFilteredPeople(newPeople);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchParams, people]);

  const handleClick = (field: string) => {
    const currentSort = searchParams.get('sort');
    const currentOrder = searchParams.get('order') || 'asc';

    if (currentSort === field && currentOrder === 'desc') {
      setSearchParams({});
    } else if (currentSort === field && currentOrder === 'asc') {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: field,
        order: 'desc',
      });
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: field,
      });
    }
  };

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
              <span
                className="icon"
                onClick={() => handleClick('name')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-sort" />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <span
                className="icon"
                onClick={() => handleClick('sex')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-sort" />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <span
                className="icon"
                onClick={() => handleClick('born')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-sort-up" />
              </span>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <span
                className="icon"
                onClick={() => handleClick('died')}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-sort" />
              </span>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.map(person => (
          <PersonInfo key={person.name} person={person} />
        ))}
      </tbody>
    </table>
  );
};
