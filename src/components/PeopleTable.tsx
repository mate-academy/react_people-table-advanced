/* eslint-disable jsx-a11y/control-has-associated-label */

import { useParams } from 'react-router-dom';
import { Person } from '../types';
import PersonLink from './PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { selectedPerson } = useParams();

  return (
    <>
      {people.length > 0 && (
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-narrow is-fullwidth"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person: Person) => {
              return (
                <PersonLink
                  key={person.slug}
                  person={person}
                  people={people}
                  markedPerson={selectedPerson === person.slug}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
