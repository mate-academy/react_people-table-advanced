import classNames from 'classnames';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

export const PersonItem: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const { sex, born, died, motherName, fatherName, mother, father } = person;
  const HAVE_NO_PARENT = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? (
          <>
            {!!mother && <PersonLink person={mother} />}

            {!mother && <span>{motherName}</span>}
          </>
        ) : (
          HAVE_NO_PARENT
        )}
      </td>
      <td>
        {fatherName ? (
          <>
            {!!father && <PersonLink person={father} />}

            {!father && <span>{fatherName}</span>}
          </>
        ) : (
          HAVE_NO_PARENT
        )}
      </td>
    </tr>
  );
};
