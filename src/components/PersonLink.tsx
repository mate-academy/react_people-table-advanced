import React from 'react';
import { Person } from '../types';
import { usePeople } from '../components/PeopleContext';
import { NavLink, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { peopleFromServer } = usePeople();
  const { selectedPerson } = useParams();

  const personExists = (name: string): boolean => {
    const names = [...peopleFromServer].map(p => p.name);

    return names.includes(name);
  };

  const findPerson = (name: string): Person | undefined => {
    return peopleFromServer.find(p => p.name === name) || undefined;
  };

  return (
    <tr
      data-cy="person"
      key={person.name}
      className={selectedPerson === person.slug ? `has-background-warning` : ''}
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          personExists(person.motherName) ? (
            <NavLink
              to={`/people/${findPerson(person.motherName)?.slug}`}
              className="has-text-danger"
            >
              {person.motherName}
            </NavLink>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          personExists(person.fatherName) ? (
            <NavLink to={`/people/${findPerson(person.fatherName)?.slug}`}>
              {person.fatherName}
            </NavLink>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
