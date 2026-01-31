import React from 'react';
import { Person } from '../types';
import { usePeople } from '../components/PeopleContext';
import { NavLink, useLocation, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { peopleFromServer } = usePeople();
  const { selectedPerson } = useParams();
  const location = useLocation();

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
          to={{
            pathname: `/people/${person.slug}`,
            search: location.search,
          }}
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
              to={{
                pathname: `/people/${findPerson(person.motherName)?.slug}`,
                search: location.search,
              }}
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
            <NavLink
              to={{
                pathname: `/people/${findPerson(person.fatherName)?.slug}`,
                search: location.search,
              }}
            >
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
