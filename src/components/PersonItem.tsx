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
  const haveNoParent = '-';

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
          haveNoParent
        )}
      </td>
      <td>
        {fatherName ? (
          <>
            {!!father && <PersonLink person={father} />}

            {!father && <span>{fatherName}</span>}
          </>
        ) : (
          haveNoParent
        )}
      </td>
    </tr>
  );
};
