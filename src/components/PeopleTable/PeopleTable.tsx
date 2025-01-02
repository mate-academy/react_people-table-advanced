import React from 'react';
import { Person } from '../../types';
import { ItemOfTable } from '../ItemOfTable';
import { useParams } from 'react-router-dom';

type Props = {
  people: Person[];
};

const COLUMNS = ['Name', 'Sex', 'Born', 'Died', 'Mother', 'Father'];

export const PeopleTable: React.FC<Props> = props => {
  const { people } = props;
  const { slug } = useParams();

  const selected = people.find(person => person.slug === slug);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {COLUMNS.map((column, index) => (
            <th key={index}>{column}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <ItemOfTable key={person.slug} person={person} selected={selected} />
        ))}
      </tbody>
    </table>
  );
};
