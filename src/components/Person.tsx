import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { PersonLink } from './PersonLink';
import { EMPTY } from '../utils/functions';
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
      className={cn({ 'has-background-warning': personSlug === person.slug })}
    >
      <td>
        <PersonLink person={person} search={search} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} search={search} />
        ) : (
          motherName || EMPTY
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} search={search} />
        ) : (
          fatherName || EMPTY
        )}
      </td>
    </tr>
  );
};
