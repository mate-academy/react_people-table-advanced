import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

interface Props {
  people: Person[];
  person: Person;
}

export const PersonRow: React.FC<Props> = ({ people, person }) => {
  const { slug } = useParams();
  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        <PersonLink person={mother} parentName={person.motherName} />
      </td>

      <td>
        <PersonLink person={father} parentName={person.fatherName} />
      </td>
    </tr>
  );
};
