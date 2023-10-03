import { useParams } from 'react-router-dom';
import { TABLE_ATTRIBUTES } from '../utils/constants';
import { Person } from '../types';
import { PersonElement } from './PersonElement/PersonElemet';

type Props = {
  people: Person[],
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId = '' } = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {TABLE_ATTRIBUTES.map((attribute: string) => (
            <th>{attribute}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {people.map((person) => (
          <PersonElement
            person={person}
            key={person.slug}
            selectedPerson={personId}
          />
        ))}
      </tbody>
    </table>
  );
};
