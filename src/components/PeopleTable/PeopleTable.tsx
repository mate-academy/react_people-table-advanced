import React from 'react';
import { useLocation } from 'react-router-dom';

import { IPerson } from '../../Interfaces/Interfaces';
import PersonRow from './PersonRow';
import TableHeader from './TableHeader';

const PeopleTable: React.FC<{ people: IPerson[] }> = ({ people }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');
  const sortBy = searchParams.get('sortBy');
  const sortByOrder = searchParams.get('sortByOrder');
  const selectors = ['name', 'sex', 'born', 'died'];

  let filtredPeople = query
    ? people.filter(
        (person) =>
          person.name.toLowerCase().includes(query) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(query)) ||
          (person.motherName && person.motherName.toLowerCase().includes(query))
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
      <table className="peopleTable">
        <thead>
          <tr>
            <TableHeader sortBy={sortBy} title="Name" />
            <TableHeader sortBy={sortBy} title="Sex" />
            <TableHeader sortBy={sortBy} title="Born" />
            <TableHeader sortBy={sortBy} title="Died" />
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
