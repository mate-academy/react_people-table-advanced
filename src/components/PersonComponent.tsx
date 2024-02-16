import { useContext } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types/Person';
import { PeopleContext } from '../context/PeopleContext';

type Props = {
  person: Person
};

export const PersonComponent: React.FC<Props> = ({ person }) => {
  const { people, selectedPerson, setSelectedPerson }
    = useContext(PeopleContext);

  const handleSelectedPerson = () => {
    const selected = (people.find(pers => {
      return pers.name === person.motherName;
    }) || null);

    setSelectedPerson(selected);
  };

  const isPresent = (sexName: keyof Person) => {
    return people.some(pers => pers.name === person[sexName]) ? (
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': sexName === 'motherName',
          })}
          onClick={handleSelectedPerson}
        >
          {person.motherName}
        </Link>
      </td>
    ) : (
      <td>
        {person.motherName}
      </td>
    );
  };

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPerson === person,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
          onClick={() => setSelectedPerson(person)}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      {person.motherName ? isPresent('motherName') : <td>-</td>}
      {person.fatherName ? isPresent('fatherName') : <td>-</td>}
    </tr>
  );
};
