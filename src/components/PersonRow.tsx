import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person,
}

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
    slug,
  } = person;

  const { personSlug = '0' } = useParams();

  const selected = personSlug === slug;

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': selected })}>
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {
          mother ? (
            <PersonLink person={person.mother} />
          ) : (
            <p>
              {motherName || '-'}
            </p>
          )
        }
      </td>

      <td>
        {
          father ? (
            <PersonLink person={person.father} />
          ) : (
            <p>
              {fatherName || '-'}
            </p>
          )
        }
      </td>
    </tr>
  );
};
