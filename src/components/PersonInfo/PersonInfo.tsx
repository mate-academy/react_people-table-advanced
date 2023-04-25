import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
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
  const { slug: selectedPersonSlug } = useParams<string>();

  const isSelected = slug === selectedPersonSlug;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelected },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>

      <td>{born}</td>

      <td>{died}</td>

      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          )
          : (
            motherName || '-'
          )}
      </td>

      <td>
        {father
          ? (
            <PersonLink person={father} />
          )
          : (
            fatherName || '-'
          )}
      </td>
    </tr>
  );
};
