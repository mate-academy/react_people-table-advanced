import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types';
import PersonLink from '../PersonLink/PersonLink';

interface Props {
  person: Person;
}

const PersonInfo: React.FC<Props> = ({ person }) => {
  const { sex, born, died, motherName, fatherName, slug, mother, father } =
    person;

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personSlug === slug })}
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

export default PersonInfo;
