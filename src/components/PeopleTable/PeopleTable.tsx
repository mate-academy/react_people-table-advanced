/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC } from 'react';
import { Person } from '../../types';
import { PersonRow } from './PersonRow';
import TableHeader from './TableHeader';

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
          <PersonRow key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
