import { FC } from 'react';
import { Person } from '../../types';
import { PeopleTableHead } from '../PeopleTableHead/PeopleTableHead';
import { PeopleTableBody } from '../PeopleTableBody/PeopleTableBody';

interface Props {
  peoples: Person[];
  selectedPersonSlug: string;
}

export const PeopleTable: FC<Props> = ({
  peoples,
  selectedPersonSlug,
}) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <PeopleTableHead />

      <tbody>
        {peoples.map(person => (
          <PeopleTableBody
            key={person.slug}
            person={person}
            selectedPersonSlug={selectedPersonSlug}
          />
        ))}
      </tbody>

    </table>
  );
};
