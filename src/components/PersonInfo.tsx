import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { Person } from '../types';
import { EMPTY_VALUE } from '../utils/constants';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': personSlug === slug,
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
          ? (
            <PersonLink person={mother} />
          ) : (
            motherName || EMPTY_VALUE
          )}
      </td>

      <td>
        {father
          ? (
            <PersonLink person={father} />
          ) : (
            fatherName || EMPTY_VALUE
          )}
      </td>
    </tr>
  );
};
