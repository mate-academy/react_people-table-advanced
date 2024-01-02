import React from 'react';

import { Person } from '../../types/Person';
import { NoPeopleOnServer } from '../Errors/NoPeopleOnServer';
import { PersonLink } from './PersonLink/PersonLink';
import { TableHeader } from './TableHead';

interface Props {
  peoples: Person[] | null;
}

export const PeopleTable: React.FC<Props> = (props) => {
  const { peoples } = props;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >

      <TableHeader />
      {!peoples ? (
        <NoPeopleOnServer />
      ) : (
        <tbody>
          {
            peoples.map(person => (
              <PersonLink person={person} key={person.slug} />
            ))
          }
        </tbody>
      )}
    </table>
  );
};
