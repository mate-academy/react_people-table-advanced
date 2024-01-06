import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { EMPTY_CELL } from '../enums';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person,
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const {
    sex, born, died, slug, motherName, mother, fatherName, father,
  } = person;

  const motherCell = motherName || EMPTY_CELL;
  const fatherCell = fatherName || EMPTY_CELL;

  const params = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === params.slug,
      })}
    >
      <td aria-label="PersonName">
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherCell
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherCell
        )}
      </td>
    </tr>
  );
};
