import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';

const NO_PARENTS = '-';

interface Props {
  person: Person;
}

export const PersonTableRow: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { sex, born, died, fatherName, motherName, mother, father } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : motherName || NO_PARENTS}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || NO_PARENTS}
      </td>
    </tr>
  );
};
