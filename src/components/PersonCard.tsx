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

  const findMother = (human: string | undefined) => {
    return peopleList.find(mother => mother.name === human);
  };

  const findFather = (human: string | undefined) => {
    return peopleList.find(father => father.name === human);
  };

  return (
    <>
      <PersonLink
        person={person}
        name={name}
      />
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {!motherName && <td>-</td>}
      {(motherName && checkMother(motherName))
        && (
          <PersonLink
            person={findMother(motherName)}
            name={person.motherName}
          />
        )}
      {motherName && !checkMother(motherName)
        && <td>{motherName}</td>}
      {!fatherName && <td>-</td>}
      {(fatherName && checkFather(fatherName))
        && (
          <PersonLink
            person={findFather(fatherName)}
            name={person.fatherName}
          />
        )}
      {fatherName && !checkFather(fatherName)
        && <td>{fatherName}</td>}

    </>
  );
};
