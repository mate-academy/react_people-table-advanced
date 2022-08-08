import { PersonLink } from './PersonLink';
import { Person } from './types/Person';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  return (
    <>
      <th>
        <PersonLink person={person} />
      </th>
      <th>{person.sex}</th>
      <th>{person.born}</th>
      <th>{person.died}</th>
      <th>
        {person.mother
          ? (
            <PersonLink person={person.mother} />
          )
          : (
            <p
              style={{
                fontWeight: 'bold',
              }}
            >
              {person.motherName}
            </p>
          )}
      </th>
      <th>
        {person.father
          ? (
            <PersonLink person={person.father} />
          )
          : (
            <p
              style={{
                fontWeight: 'bold',
              }}
            >
              {person.fatherName}
            </p>
          )}
      </th>
    </>
  );
};
