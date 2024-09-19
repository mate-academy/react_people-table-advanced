import classNames from 'classnames';
import { NO_INFO } from '../utils/functions';
import { PersonInfo } from './PersonInfo';
import { useParams } from 'react-router-dom';
import { Person as PersonType } from '../types';

type Props = {
  person: PersonType;
  search: URLSearchParams;
};

export const Person: React.FC<Props> = ({ person, search }) => {
  const { personSlug } = useParams();
  const { sex, born, died, fatherName, motherName, mother, father } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <PersonInfo person={person} search={search} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonInfo person={mother} search={search} />
        ) : (
          motherName || NO_INFO
        )}
      </td>
      <td>
        {father ? (
          <PersonInfo person={father} search={search} />
        ) : (
          fatherName || NO_INFO
        )}
      </td>
    </tr>
  );
};
