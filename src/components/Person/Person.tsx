import { FC } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person,
}

export const PersonComponent: FC<Props> = ({ person }) => {
  const { slag } = useParams();

  const {
    sex,
    born,
    died,
    motherName,
    mother,
    fatherName,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slag === person.slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {
          mother
            ? <PersonLink person={mother} />
            : motherName || '-'
        }
      </td>
      <td>
        {
          father
            ? <PersonLink person={father} />
            : fatherName || '-'
        }
      </td>
    </tr>
  );
};
