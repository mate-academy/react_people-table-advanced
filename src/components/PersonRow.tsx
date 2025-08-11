import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, mother, father } = person;

  const { slug } = useParams();

  const isSelected = person.slug === slug;

  return (
    <tr
      className={classNames({ 'has-background-warning': isSelected })}
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName ?? '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName ?? '-'}</td>
    </tr>
  );
};
