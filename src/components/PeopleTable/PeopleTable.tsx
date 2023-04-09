import { FC } from 'react';
import { Person } from '../../types';
import { PersonInfo } from '../PersonInfo/PersonInfo';
import { SortHeader } from '../SortHeader/SortHeader';

interface Props {
  people: Person[]
}

export const PeopleTable: FC<Props> = (props) => {
  const { people } = props;

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <SortHeader />
      </thead>

      <tbody>
        {people.map(person => (
          <PersonInfo
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
