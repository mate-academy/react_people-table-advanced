import './PeoplePage.scss';
import { useParams } from 'react-router-dom';
import { PersonName } from './PersonName';

interface Person {
  name: string,
  sex: string,
  born: string,
  died: string,
  motherName: string,
  fatherName: string,
}

type Props = {
  person: Person,
  people: Person[],
};

const parentAge = (peopleTable: Person[], parentName: string) => {
  const parent = peopleTable.find((person: Person) => person.name === parentName);

  if (!parent) {
    return 'No information';
  }

  return parent.born;
};

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const params = useParams();
  const parentName = params.name?.split('-').slice(0, -1).join(' ');

  return (
    <tr
      key={person.name}
      style={parentName === person.name.toLowerCase() ? { backgroundColor: 'green' } : {}}
    >
      <PersonName
        name={person.name}
        born={person.born}
        gender={person.sex}
      />
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.fatherName ? (
        <PersonName
          name={person.fatherName}
          born={parentAge(people, person.fatherName)}
          gender="m"
        />
      ) : <td />}
      {person.motherName ? (
        <PersonName
          name={person.motherName}
          born={parentAge(people, person.motherName)}
          gender="f"
        />
      ) : <td />}
    </tr>
  );
};
