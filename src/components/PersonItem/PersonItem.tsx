import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { useContext } from 'react';
import { PeopleContext } from '../../peopleContext';
import { getPersonByName } from '../../utils/getPeopleByName';

type Props = {
  person: Person;
};

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug: userId, sex, born, died, fatherName, motherName } = person;
  const { slug: selectedUserId } = useParams();

  const people = useContext(PeopleContext);

  const mother = getPersonByName(motherName, people);
  const father = getPersonByName(fatherName, people);

  return (
    <tr
      data-cy="person"
      className={userId === selectedUserId ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>

      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
