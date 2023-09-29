import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { PARENT_NOT_SET_VALUE } from '../../utils/constants';

interface Props {
  people: Person[];
  person: Person;
  selectedPersonSlug: string | undefined;
}
export const PeopleListItem: React.FC<Props> = (
  {
    person,
    selectedPersonSlug,
  },
) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': slug === selectedPersonSlug })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || PARENT_NOT_SET_VALUE
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || PARENT_NOT_SET_VALUE
        )}
      </td>
    </tr>
  );
};
