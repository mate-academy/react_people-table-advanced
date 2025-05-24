import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';

type Props = {
  people: Person[];
  name: string | null;
};

export const PersonData: React.FC<Props> = ({ people, name }) => {
  let personName = name;
  const selectedPerson = people.find(person => person.name === personName);

  if (selectedPerson) {
    return (
      <td>
        <Link
          to={`/people/${selectedPerson?.slug}`}
          className={selectedPerson.sex === 'f' ? 'has-text-danger' : ''}
        >
          {selectedPerson?.name}
        </Link>
      </td>
    );
  }

  if (!name) {
    personName = '-';
  }

  return (
    <td>
      <p>{personName}</p>
    </td>
  );
};
