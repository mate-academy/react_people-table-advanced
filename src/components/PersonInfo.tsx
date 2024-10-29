import { FC } from 'react';
import { Person } from '../types';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PersonInfo: FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const { slug, sex, born, motherName, mother, fatherName, father, died } =
    person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={personSlug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{!mother ? motherName || '-' : <PersonLink person={mother} />}</td>
      <td>{!father ? fatherName || '-' : <PersonLink person={father} />}</td>
    </tr>
  );
};
