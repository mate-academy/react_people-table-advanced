import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PersonRow: React.FC<Props> = ({ person, mother, father }) => {
  const { slug: personSlug, sex, born, died, motherName, fatherName } = person;

  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': slug === personSlug,
      })}
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
