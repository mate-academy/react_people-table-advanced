import { FC } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person,
}

export const PersonInfo: FC<Props> = (props) => {
  const { person } = props;
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

  const { userSlug } = useParams();

  const isSelected = userSlug === slug;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': isSelected,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-' }
      </td>

      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-' }
      </td>
    </tr>
  );
};
