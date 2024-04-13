import { FC } from 'react';
import cn from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';

interface Props {
  person: Person;
}

export const PersonInfo: FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const { sex, born, died, motherName, fatherName, slug, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({
        'has-background-warning': personSlug === slug,
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
