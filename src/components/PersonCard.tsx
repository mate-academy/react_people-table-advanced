/* eslint-disable max-len */
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
  peopleList: Person[],
};

export const PersonCard: React.FC<Props> = ({ person, peopleList }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

  const checkMother = (mother: string | undefined) => {
    return peopleList.some(human => human.name === mother);
  };

  const checkFather = (father: string | undefined) => {
    return peopleList.some(human => human.name === father);
  };

  return (
    <>
      <PersonLink
        person={person}
        name={name}
        sex={sex}
      />
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {!motherName && <td>-</td>}
      {(motherName && checkMother(motherName))
        && (
          <PersonLink
            person={peopleList.find(mother => mother.name === motherName)}
            name={person.motherName}
            sex="m"
          />
        )}
      {motherName && !checkMother(motherName)
        && <td>{motherName}</td>}
      {!fatherName && <td>-</td>}
      {(fatherName && checkFather(fatherName))
        && (
          <PersonLink
            person={peopleList.find(father => father.name === fatherName)}
            name={person.fatherName}
            sex="f"
          />
        )}
      {fatherName && !checkFather(fatherName)
        && <td>{fatherName}</td>}

    </>
  );
};
