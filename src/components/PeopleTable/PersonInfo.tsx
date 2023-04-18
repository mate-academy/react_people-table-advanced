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
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  return (
    <>
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          personMother
            ? (
              <PersonLink person={personMother} />
            )
            : motherName || '-'
        }
      </td>
      <td>
        {
          personFather
            ? (
              <PersonLink person={personFather} />
            )
            : fatherName || '-'
        }
      </td>
    </>
  );
};
