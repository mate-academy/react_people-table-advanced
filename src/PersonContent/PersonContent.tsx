import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from '../components/PersonLink/PersonLink';

type Props = {
  person: Person,
  personSlug?: string,
};

export const PersonContent: React.FC<Props> = ({ person, personSlug }) => {
  const {
    slug, sex, born, died, motherName, fatherName, mother, father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td><PersonLink person={person} /></td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
