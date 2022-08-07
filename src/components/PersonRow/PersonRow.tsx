import React, { useState, useContext } from 'react';
import { PeopleContext } from '../PeopleContext';
import { PersonName } from '../PersonName';

import './PersonRow.scss';

type Props = {
  person: Person,
  sortBy: string,
};

export const PersonRow: React.FC<Props> = ({ person, sortBy }) => {
  const { people, setPeople } = useContext(PeopleContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <td
        id={`${person.slug}`}
        className={sortBy === 'name' ? 'sorted-cell cell' : 'cell'}
        style={{ display: 'flex', justifyContent: 'space-between' }}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        <PersonName person={person} />
        {isHovered && (
          <div className="deleteUser">
            <button
              type="button"
              className="deleteButton"
              onClick={() => {
                setPeople(
                  people.filter(item => item.slug !== person.slug),
                );
              }}
            >
              X
            </button>
          </div>
        )}
      </td>
      <td
        className={sortBy === 'sex' ? 'sorted-cell' : ''}
      >
        {person.sex === 'm' ? 'Male' : 'Female '}
      </td>
      <td
        className={sortBy === 'born' ? 'sorted-cell' : ''}
      >
        {person.born}
      </td>
      <td
        className={sortBy === 'died' ? 'sorted-cell' : ''}
      >
        {person.died}
      </td>
      <td>
        {person.mother ? (
          <PersonName person={person.mother} />
        ) : (
          <b>{person.motherName}</b>
        )}
        {!person.motherName && '-'}
      </td>
      <td>
        {person.father ? (
          <PersonName person={person.father} />
        ) : (
          <b>{person.fatherName}</b>
        )}
        {!person.fatherName && '-'}
      </td>
    </>
  );
};
