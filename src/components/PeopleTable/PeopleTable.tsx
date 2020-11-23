import React, { useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { IPerson } from '../../Interfaces/Interfaces';
import PersonRow from './PersonRow';
import TableHeader from './TableHeader';
import debounce from 'lodash/debounce';

const PeopleTable: React.FC<{
  people: IPerson[];
}> = ({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const sortByOrder = searchParams.get('sortByOrder');
  const selectors = ['name', 'sex', 'born', 'died'];
  //Filter
  const apliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(apliedQuery);
  const history = useHistory();

  const applyQuery = useCallback(
    debounce((newQuery) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      console.log(searchParams.toString());

      history.push(`?${searchParams.toString()}`);
    }, 500),
    []
  );

  const onChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  let filtredPeople = apliedQuery
    ? people.filter(
        (person) =>
          person.name.toLowerCase().includes(apliedQuery) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(apliedQuery)) ||
          (person.motherName &&
            person.motherName.toLowerCase().includes(apliedQuery))
      )
    : people;

  if (sortBy && selectors.some((item) => item === sortBy)) {
    filtredPeople = filtredPeople.sort((personA, personB): number => {
      if (sortBy === 'name' || sortBy === 'sex') {
        return sortByOrder === 'asc' || !sortByOrder
          ? personA[sortBy].localeCompare(personB[sortBy])
          : personB[sortBy].localeCompare(personA[sortBy]);
      }

      if (sortBy === 'born' || sortBy === 'died') {
        return sortByOrder === 'asc' || !sortByOrder
          ? personA[sortBy] - personB[sortBy]
          : personB[sortBy] - personA[sortBy];
      }

      return 0;
    });
  }

  return (
    <div>
      <form className="form">
        <input
          value={query ? query : ''}
          type="text"
          placeholder="filter"
          onChange={onChange}
        />
      </form>
      <table className="peopleTable">
        <thead>
          <tr>
            <TableHeader
              sortBy={sortBy}
              title="Name"
              searchParams={searchParams}
            />
            <TableHeader
              sortBy={sortBy}
              title="Sex"
              searchParams={searchParams}
            />
            <TableHeader
              sortBy={sortBy}
              title="Born"
              searchParams={searchParams}
            />
            <TableHeader
              sortBy={sortBy}
              title="Died"
              searchParams={searchParams}
            />
            <td>Mother</td>
            <td>Father</td>
          </tr>
        </thead>
        <tbody>
          {filtredPeople.map((person) => (
            <PersonRow person={person} key={person.name} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeopleTable;
