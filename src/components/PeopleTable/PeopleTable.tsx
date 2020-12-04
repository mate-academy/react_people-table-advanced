import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { IPerson } from '../../Interfaces/Interfaces';
import PersonRow from './PersonRow';
import TableHeader from './TableHeader';
import Filter from '../Filter/Filter';

const PeopleTable: React.FC<{
  people: IPerson[];
}> = ({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get('sortBy');
  const sortByOrder = searchParams.get('sortByOrder');
  const selectors = ['name', 'sex', 'born', 'died'];
  const tableHeaders = ['Name', 'Sex', 'Born', 'Died'];
  //Filter
  const query = searchParams.get('query') || '';

  const filtredPeople = useMemo(() => {
    let filtredPeople = query
      ? people.filter(
          (person) =>
            person.name.toLowerCase().includes(query) ||
            (person.fatherName &&
              person.fatherName.toLowerCase().includes(query)) ||
            (person.motherName &&
              person.motherName.toLowerCase().includes(query))
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

    return filtredPeople;
  }, [query, sortByOrder, sortBy, people, selectors]);

  return (
    <div>
      <Filter searchParams={searchParams} />
      <table className="peopleTable">
        <thead>
          <tr>
            {tableHeaders.map((item) => (
              <TableHeader
                sortBy={sortBy}
                title={item}
                searchParams={searchParams}
                key={item}
              />
            ))}
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

export default React.memo(PeopleTable);
