import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { TableRow } from '../TableRow';

type Props = {
  people: Person[];
};

export const TableBoby: React.FC<Props> = ({ people }) => {
  const { selectedPersonSlug = '' } = useParams();

  return (
    <tbody>
      {people.map(person => (
        <TableRow
          key={person.slug}
          person={person}
          selectedPersonSlug={selectedPersonSlug}
        />
      ))}
    </tbody>
  );
};
