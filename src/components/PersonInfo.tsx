import React from 'react';
import { Person } from '../types';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};

const PARENT_IS_MISSING = '-';

const PersonInfo: React.FC<Props> = ({ person }) => {
  const { slug, sex, born, died, fatherName, motherName, mother, father } =
    person;
  const { userSlug } = useParams();
  const selectedUser = userSlug === slug;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={classNames({
        'has-background-warning': selectedUser,
      })}
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
          motherName || PARENT_IS_MISSING
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || PARENT_IS_MISSING
        )}
      </td>
    </tr>
  );
};

export default PersonInfo;
