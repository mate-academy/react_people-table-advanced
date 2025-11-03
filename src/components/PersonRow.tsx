import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow = ({ person, people }: Props) => {
  const { slug } = useParams();
  const isSelected = slug === person.slug;

  const mother = people.find(p => p.name.trim() === person.motherName?.trim());

  const father = people.find(p => p.name.trim() === person.fatherName?.trim());

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : person.motherName || '-'}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : person.fatherName || '-'}
      </td>
    </tr>
  );
};
