import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { IPerson } from '../../Interfaces/Interfaces';
import PersonRow from './PersonRow';

const PeopleTable: React.FC<{ people: IPerson[] }> = ({ people }) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const sortBy = searchParams.get('sortBy');
  const selectors = ['name', 'sex', 'born', 'died'];

  const onClick = (e: React.MouseEvent<HTMLTableDataCellElement>): void => {
    const selector = e.currentTarget.attributes.getNamedItem('data-name')
      ?.value;

    if (selector) {
      searchParams.set('sortBy', selector);
      history.push(`?${searchParams.toString()}`);
    }
  };

  let filtredPeople = name
    ? people.filter(
        (person) =>
          person.name.toLowerCase().includes(name) ||
          (person.fatherName &&
            person.fatherName.toLowerCase().includes(name)) ||
          (person.motherName && person.motherName.toLowerCase().includes(name))
      )
    : people;

  if (sortBy && selectors.some((item) => item === sortBy)) {
    filtredPeople = filtredPeople.sort((personA, personB): number => {
      if (sortBy === 'name' || sortBy === 'sex') {
        return personA[sortBy].localeCompare(personB[sortBy]);
      }

      if (sortBy === 'born' || sortBy === 'died') {
        return personA[sortBy] - personB[sortBy];
      }

      return 0;
    });
  }

  return (
    <div>
      <table className="peopleTable">
        <thead>
          <tr>
            <td data-name="name" onClick={onClick}>
              Name {sortBy === 'name' && '*'}
              <img alt="img" src="public/images/sort_both.png" />
            </td>
            <td data-name="sex" onClick={onClick}>
              Sex {sortBy === 'sex' && '*'}
              <img alt="img" src="public/images/sort_both.png" />
            </td>
            <td data-name="born" onClick={onClick}>
              Born {sortBy === 'born' && '*'}
              <img alt="img" src="public/images/sort_both.png" />
            </td>
            <td data-name="died" onClick={onClick}>
              Died {sortBy === 'died' && '*'}
              <img alt="img" src="public/images/sort_both.png" />
            </td>
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
