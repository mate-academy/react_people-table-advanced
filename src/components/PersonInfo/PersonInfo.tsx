import classNames from 'classnames';
import { PersonLink } from '../PersonLink/PersonLink';
import { InfoProps } from './InfoProps';

export const PersonInfo: React.FC<InfoProps> = ({
  person, selectedSlug = '',
}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    slug,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {mother ? (
        <td>
          <PersonLink person={mother} />
        </td>
      ) : (
        <td>
          {motherName || '-'}
        </td>
      )}
      {father ? (
        <td>
          <PersonLink person={father} />
        </td>
      ) : (
        <td>
          {fatherName || '-'}
        </td>
      )}
    </tr>
  );
};
