import { FC } from 'react';
import { PersonRow } from './PersonRow';
import { Person } from '../types';
import { TableHeader } from './TableHeader';

type Props = {
  people: Person[];
};

export const PeopleTable: FC<Props> = ({ people }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <TableHeader />

      <tbody>
        {people.map(person => (
          <PersonRow
            key={person.slug}
            motherInList={people.find(
              human => human.name === person.motherName,
            ) || null}
            fatherInList={people.find(
              human => human.name === person.fatherName,
            ) || null}
            person={person}
          />
        ))}
      </tbody>
    </table>
  );
};
