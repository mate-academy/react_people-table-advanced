import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PeopleTableRow: React.FC<Props> = ({ person }) => {
  const { slug: personSlug, sex, born, died, motherName, fatherName } = person;
  const { slug } = useParams<{ slug: string | undefined }>();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': personSlug === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
