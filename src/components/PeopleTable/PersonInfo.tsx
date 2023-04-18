import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  personMother: Person | undefined,
  personFather: Person | undefined,
};

export const PersonInfo: React.FC<Props> = ({
  person,
  personMother,
  personFather,
}) => {
  return (
    <>
      <td>
        <PersonLink person={person} />
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {
          personMother
            ? (
              <PersonLink person={personMother} />
            )
            : person.motherName || '-'
        }
      </td>
      <td>
        {
          personFather
            ? (
              <PersonLink person={personFather} />
            )
            : person.fatherName || '-'
        }
      </td>
    </>
  );
};
