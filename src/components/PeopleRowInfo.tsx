import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  selectedSlug: string;
}

export const PeopleRowInfo: React.FC<Props> = ({
  person,
  selectedSlug,
}) => {
  const {
    sex, born, died, fatherName, motherName, slug, mother, father,
  } = person;

  return (
    <tr
      className={classNames({
        'has-background-warning': slug === selectedSlug,
      })}
      data-cy="person"
    >
      <td>
        <PersonLink
          person={person}
          selectedSlug={selectedSlug}
        />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink
            person={mother}
            selectedSlug={selectedSlug}
          />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink
            person={father}
            selectedSlug={selectedSlug}
          />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
