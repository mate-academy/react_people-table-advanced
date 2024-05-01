import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, mother, father } = person;

  const { personSlug } = useParams();

  const isChosen = person.slug === personSlug;

  return (
    <tr
      className={classNames({ 'has-background-warning': isChosen })}
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother !== undefined ? (
          <PersonLink person={mother} />
        ) : (
          motherName ?? '-'
        )}
      </td>
      <td>
        {father !== undefined ? (
          <PersonLink person={father} />
        ) : (
          fatherName ?? '-'
        )}
      </td>
    </tr>
  );
};
