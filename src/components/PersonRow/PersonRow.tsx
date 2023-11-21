import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
  people: Person[];
}

export const PersonRow: React.FC<Props> = ({ person, people }) => {
  const motherLink = people.find((el) => el.name === person.motherName);
  const fatherLink = people.find((el) => el.name === person.fatherName);

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName
        && motherLink
          ? <PersonLink person={motherLink} /> : person.motherName}
        {!person.motherName && '-'}
      </td>
      <td>
        {person.fatherName
        && fatherLink
          ? <PersonLink person={fatherLink} /> : person.fatherName}
        {!person.fatherName && '-'}
      </td>
    </tr>
  );
};
